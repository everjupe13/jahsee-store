export class Preloader {
  static invoke() {
    window.addEventListener('load', () => {
      setTimeout(async () => {
        await this.fadeOut(document.querySelector('#loader'))
        document.body.classList.remove('body-loading')
      }, 600)
    })
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
        op -= op * 0.1
      }, 10)
    })
  }
}
