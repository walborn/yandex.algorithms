module.exports = function(str) {
  // Если пришло совсем не то
  if (typeof str !== 'string') return '0'

  const res = str.toLowerCase().match(/(^|\n| )ta'(so|ko|ta|qa|goo) (\d+)/)

  // Если пришло что-то не то
  if (!Array.isArray(res) && res.length < 4) return '0'

  const emperor = res?.[2]
  const day = res?.[3]
  // Иначе все хорошо
  // Только отрезаем первый элемент, в котором полное совпадение
  return `${emperor} ${day}`
}

const test1 = `DUN 'Ej QAD Je pAtLh TLhOQ
Ta'tA 494 PuS WoVBe' SICh HuD,`
const test2 = "Ta'gh ta'So 29 jE yin"
console.log(module.exports(test1))
console.log(module.exports(test2))
