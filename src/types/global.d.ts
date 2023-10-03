// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type AnyObject = { [x: string]: any }

export {}

declare global {
  interface Window {
    ym: (id: number, action: string, options: AnyObject) => void
  }
}
