export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const BRAND_NAME = 'AYAYSEE'
export const constructPageTitle = (title?: string) => {
  return [title?.toUpperCase(), BRAND_NAME].filter(Boolean).join(' - ')
}
