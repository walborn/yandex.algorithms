const fs = require('fs')
const test = 1
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
// const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/

const m = Number(input())

const lens = []

for (let _ = 0; _ < m; _++) {
  const n = Number(input())
  const x = input().trim().split(' ').map(Number)
  const len = []
  let i = 0
  while (i < n) {
    let min = x[i]
    let j = i + 1
    while (j < n && (min = Math.min(min, x[j])) > j - i) j++
    len.push(j - i)
    i = j
  }
  lens.push(len)
}
/*
fs.writeFileSync('output.txt', lens.map(l => `${l.length}\n${l.join(' ')}`).join('\n'))
*/
