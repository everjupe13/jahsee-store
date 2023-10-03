export {}

declare global {
  interface Window {
    ym: (id: number, action: string, options: AnyObject) => void
  }
}
