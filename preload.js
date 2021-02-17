#!/usr/bin/env node

const { mkdir, readFile, writeFile } = require('fs')
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
  zip,
} = require('lodash/fp')
const {
  default: fetch,
} = require('node-fetch')

const GW2_API_ACCESS_TOKEN = process.env.GW2_ACCESS_TOKEN
const GW2_API_LANGUAGE = 'en'
const GW2_API_SCHEMA_VERSION = '2021-01-01T00:00:00Z'

const ensure = promisify(mkdir)
const read = promisify(readFile)
const write = promisify(writeFile)

function request(api, params) {
  const query = stringify({
    access_token: GW2_API_ACCESS_TOKEN,
    lang: GW2_API_LANGUAGE,
    v: GW2_API_SCHEMA_VERSION,
    ...params
  })

  return fetch(`https://api.guildwars2.com${api}?${query}`)
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
          .then(data => [
            ...response,
            ...data
          ])
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
  return read('data/prefetchs.json', 'utf8')
    .then(data => JSON.parse(data))
    .then(data => data[name] || [])
    .then(filter(id => Number.isInteger(id)))
}

function saveToPreloadData(name, data) {
  return ensure('data/preloads', { recursive: true })
    .then(() => write(`data/preloads/${name}.json`, JSON.stringify(data))
      .then(() => {
        console.info(`File "${name}.json" Saved`)
        return {
          [name]: data,
        }
      })
    )
}

const transformers = [
  ({ items, itemstats }) => {
    const getItemType = item => {
      if (item.details) {
        if (item.details.infusion_upgrade_flags) {
          if (item.details.infusion_upgrade_flags.length > 0) {
            for (const type of item.details.infusion_upgrade_flags) {
              return type
            }
          }
        }

        if (item.details.type) {
          return item.details.type
        }
      }

      return item.type
    }

    const pipeline = flow(
      Object.values,
      map(item => {
        const id = item.id
        const name = item.name

        const slug = slugify(item.name)
        const type = slugify(getItemType(item))

        if (item.details) {
          const weight = item.details.weight_class ? slugify(item.details.weight_class) : null

          if (item.details.infix_upgrade) {
            if (item.details.infix_upgrade.attributes) {
              if (item.details.infix_upgrade.attributes.length > 0) {
                const stat = item.details.infix_upgrade.id
                const statslug = itemstats[stat] ? slugify(itemstats[stat].name) : null

                return {
                  id,
                  name,
                  slug,
                  type,
                  weight,
                  stats: statslug ? [stat] : [],
                  statslugs: statslug ? [statslug] : [],
                }
              }
            }
          }

          if (item.details.stat_choices) {
            const stats = item.details.stat_choices
            const statslugs = flow(
              map(stat => itemstats[stat]),
              map(get('name')),
              map(slugify),
            )(stats)

            return {
              id,
              name,
              slug,
              type,
              weight,
              stats,
              statslugs,
            }
          }

          return {
            id,
            name,
            slug,
            type,
            weight,
          }
        }

        return {
          id,
          name,
          slug,
          type,
        }
      }),
      map(item => [item.id, item]),
      fromPairs,
    )

    return saveToPreloadData('item-data', pipeline(items))
  },
  ({ 'item-data': data }) => {
    const pipeline = flow(
      Object.values,
      map(item => [item.slug, item.id]),
      fromPairs,
    )

    return saveToPreloadData('item-slugs', pipeline(data))
  },
  ({ itemstats }) => {
    const pipeline = flow(
      map(stat => ({
        id: stat.id,
        name: stat.name,
        slug: slugify(stat.name),
      })),
      map(stat => [stat.id, stat]),
      fromPairs,
    )

    return saveToPreloadData('itemstat-data', pipeline(itemstats))
  },
  ({ legends, skills }) => {
    const pipeline = flow(
      map(legend => {
        const name = skills[legend.swap].name.replace(/Legendary (.+) Stance/, '$1')
        return {
          id: legend.id,
          name: name,
          slug: slugify(name),
          code: legend.code
        }
      }),
      map(legend => [legend.id, legend]),
      fromPairs,
    )

    return saveToPreloadData('legend-data', pipeline(legends))
  },
  ({ 'legend-data': data }) => {
    const pipeline = flow(
      Object.values,
      map(legend => [legend.slug, legend.id]),
      fromPairs,
    )

    return saveToPreloadData('legend-slugs', pipeline(data))
  },
  ({ professions, specializations }) => {
    const pipeline = flow(
      reduce((data, profession) => [
        ...data,
        {
          id: profession.id,
          code: profession.code,
          name: profession.name,
          slug: slugify(profession.name),
        },
        ...flow(
          map(specialization => specializations[specialization]),
          filter(specialization => specialization.elite),
          reduce((data, specialization) => [
            ...data,
            {
              id: profession.id,
              code: profession.code,
              name: specialization.name,
              slug: slugify(specialization.name),
              elite: specialization.id,
            }
          ], []),
        )(profession.specializations)
      ], []),
      map(profession => [profession.name, profession]),
      fromPairs,
    )

    return saveToPreloadData('profession-data', pipeline(professions))
  },
  ({ 'profession-data': data }) => {
    const pipeline = flow(
      Object.values,
      map(profession => [profession.slug, profession.name]),
      fromPairs,
    )

    return saveToPreloadData('profession-slugs', pipeline(data))
  },
  ({ legends, professions, skills }) => {
    const revenantMaxSkillIds = flow(
      Object.values,
      map(legend => [legend.heal, ...legend.utilities, legend.elite]),
      reduce(zip, [0, 0, 0, 0, 0]),
      map(flow(flatten, flatten, flatten, flatten, flatten, max)),
      skills => zip(['heal', 'utility1', 'utility2', 'utility3', 'elite'], skills),
      fromPairs,
    )(legends)

    const professionSkills = flow(
      Object.values,
      map(get('skills_by_palette')),
      map(map(([code, id]) => {
        const skill = skills[id]
        return {
          id: skill.id,
          name: skill.name,
          slug: slugify(skill.name),
          code: code,
        }
      })),
      reduce(concat, []),
      map(skill => [skill.id, skill]),
      fromPairs,
    )(professions)

    const legendSkills = flow(
      Object.values,
      map(legend => [
        ['heal', legend.heal],
        ['utility1', legend.utilities[0]],
        ['utility2', legend.utilities[1]],
        ['utility3', legend.utilities[2]],
        ['elite', legend.elite],
      ]),
      map(map(([maxSkillIndex, skillId]) => {
        const skill = skills[skillId]
        return {
          id: skill.id,
          name: skill.name,
          slug: slugify(skill.name),
          code: professionSkills[revenantMaxSkillIds[maxSkillIndex]].code,
        }
      })),
      map(skill => [skill.id, skill]),
      fromPairs,
    )(legends)

    const allSkills = flow(
      Object.values,
      map(skill => ({
        id: skill.id,
        name: skill.name,
        slug: slugify(skill.name),
      })),
      map(skill => [skill.id, skill]),
      fromPairs,
    )(skills)

    return saveToPreloadData('skill-data', {
      ...allSkills,
      ...legendSkills,
      ...professionSkills,
    })
  },
  ({ 'skill-data': data }) => {
    const pipeline = flow(
      Object.values,
      map(skill => [skill.slug, skill.id]),
      fromPairs,
    )

    return saveToPreloadData('skill-slugs', pipeline(data))
  },
  ({ specializations }) => {
    const pipeline = flow(
      map(specialization => ({
        id: specialization.id,
        name: specialization.name,
        slug: slugify(specialization.name),
      })),
      map(specialization => [specialization.id, specialization]),
      fromPairs,
    )

    return saveToPreloadData('specialization-data', pipeline(specializations))
  },
  ({ 'specialization-data': data }) => {
    const pipeline = flow(
      Object.values,
      map(specialization => [specialization.slug, specialization.id]),
      fromPairs,
    )

    return saveToPreloadData('specialization-slugs', pipeline(data))
  },
  ({ traits }) => {
    const pipeline = flow(
      map(trait => ({
        id: trait.id,
        name: trait.name,
        slug: slugify(trait.name),
      })),
      map(trait => [trait.id, trait]),
      fromPairs,
    )

    return saveToPreloadData('trait-data', pipeline(traits))
  },
  ({ 'trait-data': data }) => {
    const pipeline = flow(
      Object.values,
      map(trait => [trait.slug, trait.id]),
      fromPairs,
    )

    return saveToPreloadData('trait-slugs', pipeline(data))
  },
]

const pipeline = flow(
  map(async ([type, url]) => {
    const pageSize = 200

    const pipeline = flow(
      filter(item => item.name === undefined || item.name !== ''),
      map(item => [item.id, item]),
      fromPairs,
    )

    const requestAPIPrefetched = flow(
      chunk(pageSize),
      map(ids => request(url, {
        ids: ids.join(',')
      })),
    )

    return loadPrefetchData(type)
      .then(prefetchIds => {
        if (prefetchIds.length > 0) {
          return Promise
            .all(requestAPIPrefetched(prefetchIds))
            .then(reduce((data, items) => ({
              ...data,
              ...pipeline(items),
            }), {}))
        }

        return requestPagedAPI(url, 0, pageSize)
            .then(pipeline)
      })
      .then(data => saveToPreloadData(type, data))
  }),
  reduce(async (promise, request) => {
    return promise.then(async payload => {
      return request.then(async response => {
        return {
          ...payload,
          ...response,
        }
      })
    })
  }, Promise.resolve({})),
  async promise => reduce(async (promise, transformer) => {
    return promise.then(async payload => {
      return transformer(payload).then(data => ({
        ...payload,
        ...data,
      }))
    })
  }, promise)(transformers),
  async promise => promise
    .then(() => console.info('Preloading Finished!'))
    .catch(console.error),
)

return pipeline([
  ['items', '/v2/items'],
  ['itemstats', '/v2/itemstats'],
  ['legends', '/v2/legends'],
  ['professions', '/v2/professions'],
  ['skills', '/v2/skills'],
  ['specializations', '/v2/specializations'],
  ['traits', '/v2/traits'],
])
