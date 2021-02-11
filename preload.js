#!/usr/bin/env node

const { readFile, writeFile } = require('fs')
const { stringify } = require('querystring')
const { promisify } = require('util')

const {
  chunk,
  concat,
  filter,
  flow,
  fromPairs,
  get,
  map,
  max,
  reduce,
  tap
} = require('lodash/fp')
const {
  default: fetch
} = require('node-fetch')

const GW2_API_ACCESS_TOKEN = process.env.GW2_ACCESS_TOKEN
const GW2_API_LANGUAGE = 'en'
const GW2_API_SCHEMA_VERSION = '2021-01-01T00:00:00Z'

const read = promisify(readFile)
const write = promisify(writeFile)

const apis = [
  ['items', '/v2/items'],
  ['itemstats', '/v2/itemstats'],
  ['legends', '/v2/legends'],
  ['professions', '/v2/professions'],
  ['skills', '/v2/skills'],
  ['specializations', '/v2/specializations'],
  ['traits', '/v2/traits'],
]

const transformers = [
  ({ items }) => {
    const slugToId = fromPairs(flow(
      Object.values,
      map(item => [slugify(item.name), item.id]),
    )(items))

    return saveToPreloadData('item-slug-to-id', slugToId)
      .then(() => console.log('Prepared "item-slug-to-id" done!'))
  },
  ({ professions, skills }) => {
    const professionSkillSlugToId = fromPairs(flow(
      Object.values,
      map(get('skills_by_palette')),
      map(map(([_, skillId]) => get(`${skillId}`))),
      reduce(concat, []),
      map(getter => getter(skills)),
      map(skill => [slugify(skill.name), skill.id]),
    )(professions))

    const skillSlugToId = fromPairs(flow(
      Object.values,
      map(skill => [slugify(skill.name), skill.id]),
    )(skills))

    const slugToId = {
      ...skillSlugToId,
      ...professionSkillSlugToId,
    }

    return saveToPreloadData('skill-slug-to-id', slugToId)
      .then(() => console.log('Prepared "skill-slug-to-id" done!'))
  },
  ({ professions, skills }) => {
    const professionSkillSlugToName = fromPairs(flow(
      Object.values,
      map(get('skills_by_palette')),
      map(map(([_, skillId]) => get(`${skillId}`))),
      reduce(concat, []),
      map(getter => getter(skills)),
      map(skill => [slugify(skill.name), skill.name]),
    )(professions))

    const skillSlugToName = fromPairs(flow(
      Object.values,
      map(skill => [slugify(skill.name), skill.name]),
    )(skills))

    const slugToName = {
      ...skillSlugToName,
      ...professionSkillSlugToName,
    }

    return saveToPreloadData('skill-slug-to-name', slugToName)
      .then(() => console.log('Prepared "skill-slug-to-name" done!'))
  },
  ({ legends, professions }) => {
    const revenantSkillMaxIds = flow(
      map(path => flow(
        flow(
          Object.values,
          map(get(path)),
        ),
        max,
        id => [path, id]
      )),
      map(getter => getter(legends)),
    )([
      'heal',
      'utilities[0]',
      'utilities[1]',
      'utilities[2]',
      'elite'
    ])

    const professionSkillIdToCode = fromPairs(flow(
      Object.values,
      map(flow(
        get('skills_by_palette'),
        map(([code, skillId]) => [skillId, code])
      )),
      reduce(concat, [])
    )(professions))

    const legendSkillIdToCode = fromPairs(flow(
      Object.values,
      map(legend => map(([path, codeSkillId]) => {
        return [get(path)(legend), professionSkillIdToCode[codeSkillId]]
      })(revenantSkillMaxIds)),
      reduce(concat, [])
    )(legends))

    const idToCode = {
      ...professionSkillIdToCode,
      ...legendSkillIdToCode,
    }

    return saveToPreloadData('skill-id-to-code', idToCode)
      .then(() => console.log('Prepared "skill-id-to-code" done!'))
  },
]

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

function slugify(name) {
  return name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

function loadPrefetchData(name) {
  return read('data/guildwars2.json', 'utf8')
    .then(data => JSON.parse(data))
    .then(data => data.prefetch && data.prefetch[name] || [])
}

function saveToPreloadData(name, data) {
  return write(`data/preloads/${name}.json`, JSON.stringify(data))
    .then(() => data)
    .catch(() => null)
}

const requests = apis
  .map(([type, url]) => {
    const pageSize = 200

    const pipeline = flow(
      filter(item => item.name === undefined || item.name !== ''),
      items => items.map(item => [item.id, item]),
      fromPairs
    )

    return loadPrefetchData(type)
      .then(prefetchIds => {
        console.info(`Preloading "${type}" started!`)
        return prefetchIds
      })
      .then(prefetchIds => {
        if (prefetchIds.length > 0) {
          const requests = flow(
            chunk(pageSize),
            map(ids => {
              const params = {
                ids: ids.join(',')
              }

              return request(url, params)
            }),
          )(prefetchIds)

          return Promise
            .all(requests)
            .then(responses => reduce((data, items) => ({
              ...data,
              ...pipeline(items),
            }), {})(responses))
        } else {
          return requestPagedAPI(url, 0, pageSize)
            .then(pipeline)
        }
      })
      .then(data => saveToPreloadData(type, data))
      .then(data => {
        console.info(`Preloading "${type}" finished!`)
        return [type, data]
      })
  })

return Promise
  .all(requests)
  .then(fromPairs)
  .then(data => transformers.map(transformer => tap(transformer)(data)))
