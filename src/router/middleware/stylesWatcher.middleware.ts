import { NavigationGuardWithThis } from 'vue-router'

export const stylesWatcherMiddleware: NavigationGuardWithThis<undefined> = (
  to,
  _from
) => {
  const _app = document.querySelector('#app') as HTMLElement
  const _header = document.querySelector('#header') as HTMLElement

  if (_app && _header) {
    _app.style.paddingTop = `${_header?.getBoundingClientRect().height || 0}px`
  }

  if (to.name === 'home') {
    document.querySelector('.header')?.classList.remove('header_full')
    document.querySelector('#app')?.classList.remove('animated')
  } else {
    document.querySelector('.header')?.classList.add('header_full')
    document.querySelector('#app')?.classList.add('animated')
  }
}
