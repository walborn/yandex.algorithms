const fs = require('fs')
const test = 123123
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
// const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/
const n = Number(input()) - 1
const a = input().split(' ').map(Number).sort((x, y) => x - y)

let i = Math.floor(n / 2)
let j = Math.ceil(n / 2)

const b = [a[i]]
if (i !== j) b.push(a[j])

while (i) {
  b.push(a[--i], a[++j])
}

console.log(b.join(' '))
console.log(answer)
/*
fs.writeFileSync('output.txt', `${b.join(' ')}`)
*/
