const dividerRawIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <g>
      <path d="M7 3H9V13H7V3Z" fill="white" />
      <path
        d="M3.17188 6.36523L4.17187 4.63318L12.8321 9.63318L11.8321 11.3652L3.17188 6.36523Z"
        fill="white"
      />
      <path
        d="M4.17188 11.3662L3.17188 9.63416L11.8321 4.63416L12.8321 6.36621L4.17188 11.3662Z"
        fill="white"
      />
    </g>
  </svg>
`

const spanWrapper = document.createElement('span')
spanWrapper.innerHTML = dividerRawIcon

const getString = (function () {
  const div: HTMLElement = document.createElement('div')

  if ('outerHTML' in div) {
    return function (node: HTMLElement) {
      return node.outerHTML
    }
  }

  return function (node: HTMLElement) {
    const _div = (div as HTMLElement).cloneNode() as HTMLElement
    _div.append(node.cloneNode(true))
    return _div.innerHTML
  }
})()

export const HomeCardTagDividerIconRaw = getString(spanWrapper)
