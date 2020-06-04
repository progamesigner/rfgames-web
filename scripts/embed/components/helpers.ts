export function buildWikiLink(to: string, lang = 'en'): string {
  return `https://wiki-${lang}.guildwars2.com/wiki/Special:Search/${encodeURIComponent(to)}`
}
