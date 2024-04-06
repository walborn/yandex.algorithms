/** @returns Array<string|null> */


module.exports = function(inputString) {
  const I = '([GHKLMNOPQRSTU][3-8]{3})' // Space
  const AS = '(B[CKMB][GJP]|T[ORS][J8ME])' // Industry
  const N = '([0-9A-Y]{1,24})'
  const reg = new RegExp(`^${I}${AS}${N}Z$`)
  const res = inputString.match(reg)
  if (!res) return null
  return [ res[1], res[2][0], res[2].slice(1), res[3] ]
}
console.log(module.exports('O464TR849BM182BDZ'))
// Пространство O464, Техногенная, Роботы на V8, ID экземпляра 49BM182BD
console.log(module.exports('U345BMG123456789ABCDEFZ'))
// Пространство U345, Биологическая, Метановые грибы, ID экземпляра 123456789ABCDEF

// O464TR849BM182BDZ	["O464", "T", "R8", "49BM182BD"]
// U345BMG123456789ABCDEFZ	["U345", "B", "MG", "123456789ABCDEF"]

console.log(module.exports('G333TR81Z')) // ["G333","T","R8","1"]
console.log(module.exports('G333TR81Z')) // ["G333","T","R8","1"]