/* eslint-disable @typescript-eslint/no-explicit-any */
export {}

declare global {
  interface Window {
    ym: (id: number, action: string, options: AnyObject) => void
    DePayButtons: any
  }
}
