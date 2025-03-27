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

const n = Number(input()) // количество покупателей

const a = [] // только за себя
const b = [] // за себя и за того парня
const c = [] // за себя и двух сзади

for (let i = 0; i < n; i++) {
  const [ ai, bi, ci ] = input().split(' ').map(Number)
  a.unshift(ai)
  b.unshift(bi)
  c.unshift(ci)
}

const cache = {}
cache[0] = a[0]
cache[1] = Math.min(a[1] + a[0], b[1])
cache[2] = Math.min(a[2] + a[1] + a[0], b[2] + a[0], c[2])


const f = (i) => {
  if (i in cache) return cache[i]
  return cache[i] = Math.min(a[i] + f(i - 1), b[i] + f(i - 2), c[i] + f(i - 3))
}

/*
fs.writeFileSync('output.txt', f(n - 1).toString())
*/
