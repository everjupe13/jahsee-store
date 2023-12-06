export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const firstLetterCapitalize = (value?: string) =>
  value && value.charAt(0) + value.slice(1)

export const BRAND_NAME = 'AYAYSEE'
export const constructPageTitle = (title?: string) => {
  const normalizedBrandName = firstLetterCapitalize(BRAND_NAME)
  const normalizedTitle = firstLetterCapitalize(title)
  return [normalizedTitle, normalizedBrandName].filter(Boolean).join(' - ')
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
