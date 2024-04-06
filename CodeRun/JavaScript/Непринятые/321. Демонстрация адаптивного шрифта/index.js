/***
 * @param container {Node} ссылка на DOM-node, в которую нужно вписать строку `str`
 * @param str {string} строка, которую необходимо вписать. Максимальная длина равняется 100 символам
 * @param min {number} минимальное значение `font-variation-settings` (целое число)
 * @param max {number} максимальное значение `font-variation-settings` (целое число)
 * @return {number | null} искомое значение `font-variation-settings` (целое число) или null, если текст вписать нельзя
 */

// document.fonts.onloadingdone
async function  calcFontVariationSettings(container, str, min, max) {
  container.innerHTML = str
  const width = container.offsetWidth
  const display = container.style.display
  container.style.display = 'inline-block'


  for (let i = min; i <= max + 1; i++) {
    await new Promise((rs) => setTimeout(() => rs(), 100))
    container.style.fontVariationSettings = `'wdth' ${i}`
    setTimeout(() => {}, 0)
    if (container.offsetWidth > width) return i === min ? null : i - 1
  }
  container.style.display = display
  return null
}

console.log(calcFontVariationSettings(document.getElementById("container"), `DEMO`, 0, 150))