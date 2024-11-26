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

const b = [ ...a ]
const c = [ ...a ]
for (let i = 1; i < n; i++) b[i] += b[i - 1]
for (let i = 1; i < n - 1; i++) b[i] += b[i - 1]
for (let i = n - 2; i > -1; i--) c[i] += c[i + 1]
for (let i = n - 2; i; i--) c[i] += c[i + 1]


let ans = Infinity
for (let i = 0; i < n; i++) {
  ans = Math.min(ans, (b[i - 1] || 0) + (c[i + 1] || 0))
}

console.log(ans)
console.log(+answer)

/*
fs.writeFileSync('output.txt', `${ans}`)
*/
