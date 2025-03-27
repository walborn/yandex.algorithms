const fs = require('fs')
const test = 1
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/

const n = Number(input())
const a = input().split(' ').map(Number).sort((i, j) => i - j)

const x = []
for (let i = 0; i < n - 1; i++) x.push(a[i + 1] - a[i])
let u = Number.MAX_SAFE_INTEGER
let v = x[0]
//  t = x[1] + Math.min(x[0], Inf) = x[1] + x[0]
//  z = x[2] + Math.min(x[0], x[1] + x[0]) = x[2] + x[0]
for (let i = 1; i < n - 1; i++) {
  [u, v] = [v, x[i] + Math.min(u, v)]
}

/*
fs.writeFileSync('output.txt', v.toString())
*/
