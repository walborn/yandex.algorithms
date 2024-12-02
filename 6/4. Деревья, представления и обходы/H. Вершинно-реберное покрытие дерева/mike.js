const fs = require('fs')
const test = 2
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/
const n = Number(input())
const a = input().split(' ').map(Number)

let p = 0
let s = a.reduce((r, i) => r + i, 0)
let ans = a.reduce((r, i, j) => r + i * j, 0)

for (let i = 0, x = ans; i < n; i++) {
  ans = Math.min(ans, x += (p += a[i]) - (s -= a[i]))
}
console.log(ans)
console.log(+answer)

/*
fs.writeFileSync('output.txt', `${ans}`)
*/
