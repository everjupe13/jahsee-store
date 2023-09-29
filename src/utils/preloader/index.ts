import { sleep } from '..'

export class Preloader {
  private static bodyDomElement: HTMLElement
  private static loaderDomElement: HTMLElement
  private static cssClasses = {
    beforeLoading: 'before-loading',
    loading: 'loading',
    afterLoading: 'after-loading'
  }

  static invoke(callback: () => void) {
    return this.lifeCycle({
      afterLoadingHook: async () => {
        callback()
        return new Promise<void>(resolve => resolve())
      }
    })
  }

  private static lifeCycle({
    beforeLoadingHook,
    loadingHook,
    afterLoadingHook
  }: {
    beforeLoadingHook?: () => Promise<void>
    loadingHook?: () => Promise<void>
    afterLoadingHook?: () => Promise<void>
  } = {}) {
    const isInited = this.initElements()
    if (!isInited) {
      return
    }

    return new Promise<void>(resolve => {
      window.addEventListener('load', async () => {
        await beforeLoadingHook?.()
        await this.beforeLoading()
        await sleep(200)

        await loadingHook?.()
        await this.loading()
        await sleep(1000)

        await this.afterLoading()
        await sleep(200)
        await afterLoadingHook?.()
        await this.fadeOut(this.loaderDomElement)
        return resolve()
      })
    })
  }

  private static async beforeLoading() {
    this.handleClassesChange('beforeLoading')
    return
  }
  private static async loading() {
    this.handleClassesChange('loading')
    return
  }
  private static async afterLoading() {
    this.handleClassesChange('afterLoading')
    return
  }

  private static initElements() {
    const _bodyDomElement = document.querySelector('body') as HTMLElement
    const _loaderDomElement = document.querySelector('#loader') as HTMLElement

    if (!_bodyDomElement || !_loaderDomElement) {
      return false
    }

    this.bodyDomElement = _bodyDomElement
    this.loaderDomElement = _loaderDomElement
    return true
  }

  private static handleClassesChange(key: keyof typeof this.cssClasses) {
    for (const classesKey of Object.keys(this.cssClasses)) {
      if (classesKey !== key) {
        this.loaderDomElement.classList.remove(
          this.cssClasses[classesKey as keyof typeof this.cssClasses]
        )
      }
    }

    this.loaderDomElement.classList.add(this.cssClasses[key])
  }

  private static fadeOut(element: HTMLElement | null) {
    if (!element) {
      return Promise.resolve()
    }

    return new Promise<void>((resolve, _reject) => {
      let op = 1
      const timer = setInterval(function () {
        if (op <= 0.1) {
          clearInterval(timer)
          element.style.display = 'none'
          resolve()
        }

        element.style.opacity = String(op)
        element.style.filter = 'alpha(opacity=' + op * 100 + ')'
        op -= op * 0.08
      }, 15)
    })
  }
}
