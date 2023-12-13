const isDefaultVersion = () =>
  Number(sessionStorage.getItem('ab_version')) === 1
const isSizesVersion = () => Number(sessionStorage.getItem('ab_version')) === 2
const isSizeGridVersion = () =>
  Number(sessionStorage.getItem('ab_version')) === 3
const isSliderVersion = () => Number(sessionStorage.getItem('ab_version')) === 4

export { isDefaultVersion, isSizeGridVersion, isSizesVersion, isSliderVersion }
