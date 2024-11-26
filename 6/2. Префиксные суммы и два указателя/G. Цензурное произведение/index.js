const fs = require('fs')
const test = 1
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/
const [ n, c ] = input().split(' ').map(Number)
let s = input()

let ans = 0
let l = 0
let r = 0

let x = 0
let A = 0
let B = 0

while (r <= n) {
  if (x <= c) {
    ans = Math.max(ans, r - l)
    if (s[r] === 'a') A++
    if (s[r] === 'b') B++
    if (s[r++] === 'b') x += A
  }
  else {
    if (s[l] === 'a') A--
    if (s[l] === 'b') B--
    if (s[l++] === 'a') x -= B
  }
}


console.log(ans)
console.log(+answer)
/*
fs.writeFileSync('output.txt', `${ans}`)
*/
