#!/usr/bin/env node

const { readFile, writeFile } = require('fs')
const { stringify } = require('querystring')
const { promisify } = require('util')

const { chunk, filter, flow, fromPairs, pick, toPairs } = require('lodash/fp')
const { default: fetch } = require('node-fetch')

const GW2_API_ACCESS_TOKEN = process.env.GW2_ACCESS_TOKEN
const GW2_API_LANGUAGE = 'en'
const GW2_API_SCHEMA_VERSION = '2021-01-01T00:00:00Z'

const read = promisify(readFile)
const write = promisify(writeFile)
const pipeline = flow(
  filter(item => item.name === undefined || item.name !== ''),
  items => items.map(flow(
    pick([
      'code',
      'elite',
      'heal',
      'id',
      'name',
      'skills_by_palette',
      'swap',
      'utilities',
    ])
  )),
  items => items.map(item => [item.id, item]),
  fromPairs
)

const APIS = {
  items: '/v2/items',
  itemstats: '/v2/itemstats',
  legends: '/v2/legends',
  professions: '/v2/professions',
  skills: '/v2/skills',
  specializations: '/v2/specializations',
  traits: '/v2/traits',
}

function request(url, params) {
  const query = stringify({
    access_token: GW2_API_ACCESS_TOKEN,
    lang: GW2_API_LANGUAGE,
    v: GW2_API_SCHEMA_VERSION,
    ...params
  })

  return fetch(`https://api.guildwars2.com${url}?${query}`)
    .then(response => response.json())
}

function requestPagedAPI(url, page, pageSize) {
  const params = {
    page,
    page_size: pageSize,
  }

  return request(url, params)
    .then(response => {
      if (response.length >= pageSize) {
        return requestPagedAPI(url, page + 1, pageSize)
          .then(data => {
            return [
              ...response,
              ...data
            ]
          })
      }
      return response
    })
}

function loadPrefetchData(type) {
  return read('data/guildwars2.json', 'utf8')
    .then(data => JSON.parse(data))
    .then(data => data.prefetch && data.prefetch[type] || [])
}

function saveToPreloadData(type, data) {
  return write(`data/preloads/${type}.json`, JSON.stringify(data))
    .then(() => true)
    .catch(() => false)
}

const requests = toPairs(APIS)
  .map(([type, url]) => {
    const pageSize = 200

    loadPrefetchData(type)
      .then(prefetchIds => {
        console.info(`Preloading "${type}" started!`)
        return prefetchIds
      })
      .then(prefetchIds => {
        if (prefetchIds.length > 0) {
          const requests = chunk(pageSize)(prefetchIds)
            .map(ids => {
              const params = {
                ids: ids.join(',')
              }

              return request(url, params)
            })

          return Promise
            .all(requests)
            .then(responses => responses.reduce((data, items) => {
              return {
                ...data,
                ...pipeline(items),
              }
            }, {}))
        } else {
          return requestPagedAPI(url, 0, pageSize)
            .then(pipeline)
        }
      })
      .then(data => saveToPreloadData(type, data))
      .then(result => {
        console.info(`Preloading "${type}" finished!`)
        return result
      })
  })

return Promise.all(requests)
