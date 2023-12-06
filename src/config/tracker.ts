const isDefaultVersion = () => Number(localStorage.getItem('ab_version')) === 1
const isSizesVersion = () => Number(localStorage.getItem('ab_version')) === 2
const isSizeGridVersion = () => Number(localStorage.getItem('ab_version')) === 3
const isSliderVersion = () => Number(localStorage.getItem('ab_version')) === 4

export { isDefaultVersion, isSizeGridVersion, isSizesVersion, isSliderVersion }
