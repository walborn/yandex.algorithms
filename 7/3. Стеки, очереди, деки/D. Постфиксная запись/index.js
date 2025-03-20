const fs = require('fs')
const test = 1
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
const __ans__ = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/

const dq = []

for (const i of input().split(' '))
  if (/\d+/.test(i)) dq.push(i)
  else dq.push(((a, b) => eval(`${b} ${i} ${a}`))(dq.pop(), dq.pop()))

console.log(dq[0])
/*
fs.writeFileSync('output.txt', dq[0].toString())
*/
