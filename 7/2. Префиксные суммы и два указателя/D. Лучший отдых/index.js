const fs = require('fs')
const test = 4
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/
const [ n, k ] = input().split(' ').map(Number)
const a = input().split(' ').map(Number).sort((x, y) => x - y)

let i = 0
let j = 0
let days = 0

while (true) {
  if (a[j] - a[i] > k) i++
  else {
    days = Math.max(days, ++j - i)
    if (j === n) break
  }
}
console.log(days)
console.log(+answer)
/*
fs.writeFileSync('output.txt', `${days}`)
*/
