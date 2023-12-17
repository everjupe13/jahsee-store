const currentVersion = Number(sessionStorage.getItem('ab_version'))

const isDefaultVersion = () =>
  Number(sessionStorage.getItem('ab_version')) === 1
const isSizesVersion = () => Number(sessionStorage.getItem('ab_version')) === 2
const isSizeGridVersion = () =>
  Number(sessionStorage.getItem('ab_version')) === 3
const isSliderVersion = () => Number(sessionStorage.getItem('ab_version')) === 4

const notifyer = () => {
  if (Number.isFinite(currentVersion)) {
    window.ym(95_590_253, 'reachGoal', `v${currentVersion}`)
  }
}

export {
  isDefaultVersion,
  isSizeGridVersion,
  isSizesVersion,
  isSliderVersion,
  notifyer
}
