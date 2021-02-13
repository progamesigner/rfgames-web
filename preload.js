#!/usr/bin/env node

const { readFile, writeFile } = require('fs')
const { stringify } = require('querystring')
const { promisify } = require('util')

const {
  chunk,
  concat,
  filter,
  flatten,
  flow,
  fromPairs,
  get,
  map,
  max,
  reduce,
  tap,
  zip
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
      map(map(([_, skillId]) => get(skillId))),
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
  ({ specializations }) => {
    const slugToId = fromPairs(flow(
      Object.values,
      map(item => [slugify(item.name), item.id]),
    )(specializations))

    return saveToPreloadData('specialization-slug-to-id', slugToId)
      .then(() => console.log('Prepared "specialization-slug-to-id" done!'))
  },
  ({ traits }) => {
    const slugToId = fromPairs(flow(
      Object.values,
      map(item => [slugify(item.name), item.id]),
    )(traits))

    return saveToPreloadData('trait-slug-to-id', slugToId)
      .then(() => console.log('Prepared "trait-slug-to-id" done!'))
  },
  ({ professions, skills }) => {
    const professionSkillSlugToName = fromPairs(flow(
      Object.values,
      map(get('skills_by_palette')),
      map(map(([_, skillId]) => get(skillId))),
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
  ({ professions, specializations }) => {
    const corePofessionSlugToId = fromPairs(flow(
      Object.values,
      map(profession => [slugify(profession.name), profession.id]),
    )(professions))

    const eliteProfessionSlugToId = fromPairs(flow(
      Object.values,
      map(get('specializations')),
      map(map(get)),
      reduce(concat, []),
      map(getter => getter(specializations)),
      filter(({ elite }) => elite),
      map(eliteSpecialization => [
        slugify(eliteSpecialization.name),
        professions[eliteSpecialization.profession].name
      ])
    )(professions))

    const professionSlugToId = {
      ...corePofessionSlugToId,
      ...eliteProfessionSlugToId,
    }

    return saveToPreloadData('profession-slug-to-id', professionSlugToId)
      .then(() => console.log('Prepared "profession-slug-to-id" done!'))
  },
  ({ professions }) => {
    const professionNameToCode = fromPairs(flow(
      Object.values,
      map(profession => [slugify(profession.name), profession.code]),
    )(professions))

    return saveToPreloadData('profession-name-to-code', professionNameToCode)
      .then(() => console.log('Prepared "profession-name-to-code" done!'))
  },
  ({ professions, specializations }) => {
    const professionSlugToElite = fromPairs(flow(
      Object.values,
      map(get('specializations')),
      map(map(get)),
      reduce(concat, []),
      map(getter => getter(specializations)),
      filter(({ elite }) => elite),
      map(eliteSpecialization => [
        slugify(eliteSpecialization.name),
        eliteSpecialization.id
      ])
    )(professions))

    return saveToPreloadData('profession-slug-to-elite', professionSlugToElite)
      .then(() => console.log('Prepared "profession-slug-to-elite" done!'))
  },
  ({ legends, skills }) => {
    const legendNameToCode = fromPairs(zip(
      flow(
        Object.values,
        map(get('swap')),
        map(get),
        map(getter => getter(skills)),
        map(legendSwapSkill => slugify(legendSwapSkill.name.replace(/Legendary (.+) Stance/, '$1')))
      )(legends),
      flow(
        Object.values,
        map(get('code')),
      )(legends)
    ))

    return saveToPreloadData('legend-name-to-code', legendNameToCode)
      .then(() => console.log('Prepared "legend-name-to-code" done!'))
  },
  ({ itemstats }) => {
    const slugToId = fromPairs(flow(
      Object.values,
      map(itemstat => [slugify(itemstat.name), itemstat.id]),
    )(itemstats))

    return saveToPreloadData('itemstat-slug-to-id', slugToId)
      .then(() => console.log('Prepared "itemstat-slug-to-id" done!'))
  },
  ({ items, itemstats }) => {
    const itemTable = flow(
      Object.values,
      map(item => {
        const id = item.id
        const name = item.name
        const slug = slugify(item.name)
        const type = slugify(item.type)
        const details = item.details

        const row = {
          id,
          name,
          slug,
          type
        }

        if (details) {
          var subtype = type

          const weight = details.weight_class ? slugify(details.weight_class) : null

          if (details.type) {
            subtype = slugify(details.type)
          }

          if (details.infusion_upgrade_flags) {
            details.infusion_upgrade_flags.forEach(infusion => {
              subtype = slugify(infusion)
            })
          } else if (details.infix_upgrade) {
            if (details.infix_upgrade.attributes.length > 0) {
              const stat = itemstats[details.infix_upgrade.id]

              return [{
                ...row,
                stat: stat.id,
                statslug: slugify(stat.name),
                type: subtype,
                weight,
              }]
            }

            return [{
              ...row,
              type: subtype,
            }]
          }

          if (details.stat_choices) {
            return details.stat_choices.map(statId => {
              const stat = itemstats[statId]

              return {
                ...row,
                stat: stat.id,
                statslug: slugify(stat.name),
                type: subtype,
                weight,
              }
            })
          }

          return [{
            ...row,
            type: subtype,
          }]
        }

        return [{
          ...row,
        }]
      }),
      flatten,
    )(items)

    return saveToPreloadData('item-table', itemTable)
      .then(() => console.log('Prepared "item-table" done!'))
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
    .replace(/(.+)'s$/, '$1')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

function loadPrefetchData(name) {
  return read('data/prefetchs.json', 'utf8')
    .then(data => JSON.parse(data))
    .then(data => data[name] || [])
    .then(filter(id => Number.isInteger(id)))
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
