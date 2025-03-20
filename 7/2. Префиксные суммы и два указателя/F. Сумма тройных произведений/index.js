const fs = require('fs')
const test = 20
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
// const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/
input()
const a = input().split(' ').map(BigInt)
const b = []
const n = a.length - 2
b[n + 1] = a[n + 1]

for (let i = n; i > 1; i--) b[i] = (a[i] + b[i + 1]) % 1000000007n

const c = []
for (let i = 0; i < n; i++) c[i] = a[i + 1] * b[i + 2]
for (let i = n - 2; i > -1; i--) c[i] = (c[i] + c[i + 1]) % 1000000007n

let ans = 0n
for (let i = 0; i < n; i++) {
  ans = (ans + ((a[i] * c[i]) % 1000000007n)) % 1000000007n
}

// 20 -> 256408778
console.log(ans.toString())
/*
fs.writeFileSync('output.txt', ans.toString())
*/
