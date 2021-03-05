#!/usr/bin/env node

const { mkdir, readFile, writeFile } = require('fs')
const { stringify } = require('querystring')
const { promisify } = require('util')

const {
  default: fetch,
} = require('node-fetch')
const {
  adjust,
  always,
  concat,
  converge,
  curry,
  defaultTo,
  filter,
  flatten,
  fromPairs,
  identity,
  includes,
  indexBy,
  map,
  max,
  merge,
  pipe,
  prop,
  reduce,
  replace,
  reverse,
  splitEvery,
  times,
  toLower,
  transpose,
  zip,
} = require('rambda')

const GW2_API_ACCESS_TOKEN = process.env.GW2_ACCESS_TOKEN
const GW2_API_LANGUAGE = 'en'
const GW2_API_SCHEMA_VERSION = '2021-01-01T00:00:00Z'

const ensure = promisify(mkdir)
const read = promisify(readFile)
const write = promisify(writeFile)

const unapply = curry(func => (...args) => func(args))

const slugify = pipe(
  toLower,
  replace(/\s+/g, '-'),
  replace(/[^\w\-]+/g, ''),
  replace(/\-\-+/g, '-'),
  replace(/^-+/, ''),
  replace(/-+$/, ''),
)

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

function loadPrefetchData(name) {
  return read('data/prefetchs.json', 'utf8')
    .then(data => JSON.parse(data))
    .then(prop(name))
    .then(defaultTo([]))
    .then(filter(Number.isInteger))
}

function saveToPreloadData(name, data) {
  return ensure('data/preloads', { recursive: true })
    .then(() => write(`data/preloads/${name}.json`, JSON.stringify(data)))
    .then(() => {
      console.info(`File "${name}.json" Saved`)
      return {
        [name]: data,
      }
    })
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

    const mapArmorWeight = item => {
      if (item.details) {
        const weight = item.details.weight_class ? slugify(item.details.weight_class) : null

        return {
          weight,
        }
      }

      return {}
    }

    const mapPredefinedItem = item => {
      // @note: predefined armors, backs, trinkets, upgrade components, weapons

      if (item.details) {
        if (item.details.infix_upgrade) {
          if (item.details.infix_upgrade.attributes) {
            if (item.details.infix_upgrade.attributes.length > 0) {
              const stat = item.details.infix_upgrade.id
              const statslug = itemstats[stat] ? slugify(itemstats[stat].name) : null

              return {
                stats: statslug ? [stat] : [],
                statslugs: statslug ? [statslug] : [],
              }
            }
          }
        }
      }

      return {}
    }

    const mapSelectableItem = item => {
      if (item.details) {
        if (item.details.stat_choices) {
          const stats = item.details.stat_choices
          const statslugs = pipe(
            map(stat => itemstats[stat]),
            map(prop('name')),
            map(slugify),
          )(stats)

          return {
            stats,
            statslugs,
          }
        }
      }

      return {}
    }

    const pipeline = pipe(
      Object.values,
      map(item => {
        const id = item.id
        const name = item.name

        const slug = slugify(item.name)
        const type = slugify(getItemType(item))

        return {
          id,
          name,
          slug,
          type,
          ...mapArmorWeight(item),
          ...mapPredefinedItem(item),
          ...mapSelectableItem(item),
        }
      }),
      map(item => [item.id, item]),
      fromPairs,
    )

    return saveToPreloadData('item-data', pipeline(items))
  },
  ({ 'item-data': data }) => {
    const pipeline = pipe(
      Object.values,
      map(item => [item.slug, item.id]),
      fromPairs,
    )

    return saveToPreloadData('item-slugs', pipeline(data))
  },
  ({ itemstats }) => {
    const pipeline = pipe(
      Object.values,
      map(({ id, name }) => ({
        id,
        name,
        slug: slugify(name),
      })),
      map(stat => [stat.id, stat]),
      fromPairs,
    )

    return saveToPreloadData('itemstat-data', pipeline(itemstats))
  },
  ({ legends, skills }) => {
    const pipeline = pipe(
      Object.values,
      map(({ code, id, swap }) => {
        const name = skills[swap].name.replace(/Legendary (.+) Stance/, '$1')
        return {
          id,
          name: name,
          slug: slugify(name),
          code,
        }
      }),
      map(legend => [legend.id, legend]),
      fromPairs,
    )

    return saveToPreloadData('legend-data', pipeline(legends))
  },
  ({ 'legend-data': data }) => {
    const pipeline = pipe(
      Object.values,
      map(legend => [legend.slug, legend.id]),
      fromPairs,
    )

    return saveToPreloadData('legend-slugs', pipeline(data))
  },
  ({ professions, specializations }) => {
    const pipeline = pipe(
      Object.values,
      reduce((data, profession) => [
        ...data,
        {
          id: profession.id,
          code: profession.code,
          name: profession.name,
          slug: slugify(profession.name),
        },
        ...pipe(
          map(specialization => specializations[specialization]),
          filter(prop('elite')),
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
  ({ professions, specializations }) => {
    const pipeline = pipe(
      Object.values,
      map(pipe(
        prop('specializations'),
        map(id => specializations[id]),
        filter(({ elite }) => elite),
        map(({ id, name }) => [slugify(name), id]),
      )),
      reduce(concat, []),
      fromPairs,
    )
    return saveToPreloadData('profession-elites', pipeline(professions))
  },
  ({ 'profession-data': data }) => {
    const pipeline = pipe(
      Object.values,
      map(profession => [profession.slug, profession.id]),
      fromPairs,
    )

    return saveToPreloadData('profession-slugs', pipeline(data))
  },
  ({ legends, professions, skills }) => {
    const revenantSkillSlots = ['heal', 'utility1', 'utility2', 'utility3', 'elite']

    const revenantMaxSkillIds = pipe(
      Object.values,
      map(converge(unapply(identity), [prop('heal'), prop('utilities'), prop('elite')])),
      map(flatten),
      transpose,
      map(reduce(max, 0)),
      zip(revenantSkillSlots),
      fromPairs,
    )(legends)

    const professionSkills = pipe(
      Object.values,
      map(prop('skills_by_palette')),
      map(map(([code, id]) => {
        const { name } = skills[id]
        return {
          id,
          name,
          slug: slugify(name),
          code,
        }
      })),
      reduce(concat, []),
      map(skill => [skill.id, skill]),
      fromPairs,
    )(professions)

    const legendSkills = pipe(
      Object.values,
      map(converge(unapply(identity), [prop('heal'), prop('utilities'), prop('elite')])),
      map(flatten),
      map(zip(revenantSkillSlots)),
      map(map(([maxSkillIndex, id]) => {
        const { name } = skills[id]
        return {
          id,
          name,
          slug: slugify(name),
          code: professionSkills[revenantMaxSkillIds[maxSkillIndex]].code,
        }
      })),
      map(skill => [skill.id, skill]),
      fromPairs,
    )(legends)

    const allSkills = pipe(
      Object.values,
      map(({ id, name }) => ({
        id,
        name,
        slug: slugify(name),
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
    const pipeline = pipe(
      Object.values,
      map(skill => [skill.slug, skill.id]),
      fromPairs,
    )

    return saveToPreloadData('skill-slugs', pipeline(data))
  },
  ({ specializations }) => {
    const pipeline = pipe(
      Object.values,
      map(({ id, name }) => ({
        id,
        name,
        slug: slugify(name),
      })),
      map(specialization => [specialization.id, specialization]),
      fromPairs,
    )

    return saveToPreloadData('specialization-data', pipeline(specializations))
  },
  ({ 'specialization-data': data }) => {
    const pipeline = pipe(
      Object.values,
      map(specialization => [specialization.slug, specialization.id]),
      fromPairs,
    )

    return saveToPreloadData('specialization-slugs', pipeline(data))
  },
  ({ traits }) => {
    const pipeline = pipe(
      Object.values,
      map(({ id, name }) => ({
        id,
        name,
        slug: slugify(name),
      })),
      map(trait => [trait.id, trait]),
      fromPairs,
    )

    return saveToPreloadData('trait-data', pipeline(traits))
  },
  ({ 'trait-data': data }) => {
    const pipeline = pipe(
      Object.values,
      map(trait => [trait.slug, trait.id]),
      fromPairs,
    )

    return saveToPreloadData('trait-slugs', pipeline(data))
  },
  ({ professions, skills }) => {
    const isMainhandWeapon = includes('Mainhand')
    const isOffhandWeapon = includes('Offhand')
    const isTwohandWeapon = includes('TwoHand')

    const weaponAttunements = ['Fire', 'Water', 'Air', 'Earth']

    const weaponHeadSlots = ['Weapon_1', 'Weapon_2']
    const weaponDualSlots = ['Weapon_3']
    const weaponTailSlots = ['Weapon_4', 'Weapon_5']

    const weaponSkills = pipe(
      map(pipe(
        prop('weapons'),
        map(prop('skills')),
        map(map(({ attunement, id, offhand, slot }) => {
          const { dual_attunement } = skills[id]
          return {
            id,
            slot,
            offhand: offhand,
            attunement: attunement,
            dual_attunement: dual_attunement ?? attunement,
          }
        })),
        map((skills, type) => map(merge({ type }))(skills)),
        Object.values,
        reduce(concat, []),
      )),
      map((skills, profession) => map(merge({ profession }))(skills)),
      Object.values,
      reduce(concat, []),
    )(professions)

    const weaponAttunementFilter = attunement => pipe(
      filter(skill => skill.attunement === undefined || skill.attunement === attunement),
      filter(skill => skill.dual_attunement === undefined || skill.dual_attunement === attunement),
    )
    const weaponOffhandFilter = offhand => filter(skill => skill.offhand === offhand || skill.offhand === undefined)
    const weaponProfessionFilter = profession => filter(skill => skill.profession === profession)
    const weaponSlotFilter = slots => pipe(
      filter(skill => includes(skill.slot)(slots)),
      indexBy(skill => `${skill.slot}|${skill.attunement}|${skill.offhand}`),
      Object.values,
    )
    const weaponTypeFilter = type => filter(skill => skill.type === type)

    const pipeline = pipe(
      map(({ weapons }, profession) => [profession, pipe(
        map((weapon, type) => {
          if (isMainhandWeapon(weapon.flags)) {
            const key = `${type}|`

            const dualWieldSkills = pipe(
              filter(weapon => isOffhandWeapon(weapon.flags)),
              Object.keys,
              map(offhandType => {
                const key = `${type}|${offhandType}`

                if (profession.toLowerCase() === 'elementalist') {
                  const skills = pipe(
                    weaponProfessionFilter(profession),
                    converge(unapply(identity), map((weaponAttunementFilter))(weaponAttunements)),
                    reduce(concat, []),
                    converge(unapply(identity), [
                      pipe(
                        weaponTypeFilter(type),
                        weaponSlotFilter(weaponHeadSlots),
                      ),
                      pipe(
                        weaponTypeFilter(type),
                        weaponSlotFilter(weaponDualSlots),
                      ),
                      pipe(
                        weaponTypeFilter(offhandType),
                        weaponSlotFilter(weaponTailSlots),
                      ),
                    ]),
                    reduce(concat, []),
                    map(prop('id')),
                  )(weaponSkills)

                  return [key, skills]
                }

                const skills = pipe(
                  weaponProfessionFilter(profession),
                  converge(unapply(identity), [
                    pipe(
                      weaponTypeFilter(type),
                      weaponSlotFilter(weaponHeadSlots),
                    ),
                    pipe(
                      weaponTypeFilter(type),
                      weaponOffhandFilter(offhandType),
                      weaponSlotFilter(weaponDualSlots),
                    ),
                    pipe(
                      weaponTypeFilter(offhandType),
                      weaponSlotFilter(weaponTailSlots),
                    ),
                  ]),
                  reduce(concat, []),
                  map(prop('id')),
                )(weaponSkills)

                return [key, skills]
              }),
            )(weapons)

            if (profession.toLowerCase() === 'elementalist') {
              const skills = pipe(
                weaponProfessionFilter(profession),
                weaponTypeFilter(type),
                converge(unapply(identity), map((weaponAttunementFilter))(weaponAttunements)),
                reduce(concat, []),
                converge(unapply(identity), [
                  weaponSlotFilter(weaponHeadSlots),
                  weaponSlotFilter(weaponDualSlots),
                ]),
                reduce(concat, []),
                splitEvery(weaponHeadSlots.length + weaponDualSlots.length),
                map(concat),
                map(append => append(times(always({ id: 0 }), weaponTailSlots.length))),
                reduce(concat, []),
                map(prop('id')),
              )(weaponSkills)

              return [
                [key, skills],
                ...dualWieldSkills,
              ]
            }

            const skills = pipe(
              weaponProfessionFilter(profession),
              weaponTypeFilter(type),
              weaponOffhandFilter('Nothing'),
              converge(unapply(identity), [
                weaponSlotFilter(weaponHeadSlots),
                weaponSlotFilter(weaponDualSlots),
                () => times(always({ id: 0 }), weaponTailSlots.length),
              ]),
              reduce(concat, []),
              map(prop('id')),
            )(weaponSkills)

            return [
              [key, skills],
              ...dualWieldSkills,
            ]
          }

          if (isOffhandWeapon(weapon.flags)) {
            const key = `|${type}`

            if (profession.toLowerCase() === 'elementalist') {
              const skills = pipe(
                weaponProfessionFilter(profession),
                weaponTypeFilter(type),
                converge(unapply(identity), map((weaponAttunementFilter))(weaponAttunements)),
                reduce(concat, []),
                weaponSlotFilter(weaponTailSlots),
                splitEvery(weaponTailSlots.length),
                map(reverse),
                map(skills => concat(skills)),
                map(append => append(times(always({ id: 0 }), weaponHeadSlots.length + weaponDualSlots.length))),
                map(reverse),
                reduce(concat, []),
                map(prop('id')),
              )(weaponSkills)

              return [[key, skills]]
            }

            const skills = pipe(
              weaponProfessionFilter(profession),
              weaponTypeFilter(type),
              converge(unapply(identity), [
                () => times(always({ id: 0 }), weaponHeadSlots.length + weaponDualSlots.length),
                weaponSlotFilter(weaponTailSlots),
              ]),
              reduce(concat, []),
              map(prop('id')),
            )(weaponSkills)

            return [[key, skills]]
          }

          if (isTwohandWeapon(weapon.flags)) {
            const key = `${type}|`

            if (profession.toLowerCase() === 'elementalist') {
              const skills = pipe(
                map(attunement => pipe(
                  weaponProfessionFilter(profession),
                  weaponTypeFilter(type),
                  weaponAttunementFilter(attunement),
                  converge(unapply(identity), [
                    weaponSlotFilter(weaponHeadSlots),
                    weaponSlotFilter(weaponDualSlots),
                    weaponSlotFilter(weaponTailSlots),
                  ]),
                  reduce(concat, []),
                )),
                map(filter => filter(weaponSkills)),
                reduce(concat, []),
                map(prop('id')),
              )(weaponAttunements)

              return [[key, skills]]
            }

            const skills = pipe(
              weaponProfessionFilter(profession),
              weaponTypeFilter(type),
              converge(unapply(identity), [
                weaponSlotFilter(weaponHeadSlots),
                weaponSlotFilter(weaponDualSlots),
                weaponSlotFilter(weaponTailSlots),
              ]),
              reduce(concat, []),
              map(prop('id')),
            )(weaponSkills)

            return [[key, skills]]
          }
        }),
        Object.values,
        reduce(concat, []),
        map(adjust(0, toLower)),
        fromPairs,
      )(weapons)]),
      Object.values,
      fromPairs,
    )

    return saveToPreloadData('weapon-skills', pipeline(professions))
  },
]

const pipeline = pipe(
  map(async ([type, url]) => {
    const pageSize = 200

    const pipeline = pipe(
      filter(item => item.name === undefined || item.name !== ''),
      map(item => [item.id, item]),
      fromPairs,
    )

    const requestAPIPrefetched = pipe(
      splitEvery(pageSize),
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
