const fs = require('fs')
const test = i => `${__dirname}/tests/` + i
const input = fs.readFileSync(test(6), "utf8").split('\n')

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').split('\n')
//*/
const a = input[1].split(' ').map(Number)

const dic = {}

for (const i of a) dic[i] = (dic[i] || 0) + 1

let max = 0

for (let i in dic) {
  const localMax = dic[i] + Math.max(dic[i - 1] || 0, dic[i + 1] || 0)
  if (localMax > max) max = localMax
}

const result = +input[0] - max
console.log(result)

/*
fs.writeFileSync('output.txt', result)

*/

