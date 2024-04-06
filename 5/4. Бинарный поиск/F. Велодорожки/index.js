const fs = require('fs')
const testcase = 3
const __input__ = fs.readFileSync(`${__dirname}/tests/${testcase}`, 'utf8').split('\n')

const input = ((i = 0) => () => __input__[i++])()

const start = Date.now()
// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/


const check = (m) => {
  let j = 0
  let pmx = -(10 ** 9)
  let pmn = 10 ** 9

  // i - левая граница вертикальной дорожки
  // j - правая плитка, вылезающая за дорожку
  for (let i = 0; i < n; i++) {
    while (j < n && x[j] < x[i] + m) j += 1
    mx = pmx
    mn = pmn

    if (j !== n) {
      mx = Math.max(mx, sufmax[j])
      mn = Math.min(mn, sufmin[j])
    }
    if (mx - mn < m) return true

    pmx = prefmax[i]
    pmn = prefmin[i]
  }
  return false
}

const [w, h, n] = input().split(' ').map(Number)

const a = Array.from({ length: n }, () => input().split(' ').map(Number))
  .sort((a, b) => a[0] - b[0])

const x = []
const y = []

for (const [j, i] of a) {
  x.push(j)
  y.push(i)
}

prefmin = Array(n).fill(y[0])
prefmax = Array(n).fill(y[0])
sufmin = Array(n).fill(y.at(-1))
sufmax = Array(n).fill(y.at(-1))

for (let i = 1; i < n; i++) {
  prefmin[i] = Math.min(prefmin[i - 1], y[i])
  prefmax[i] = Math.max(prefmax[i - 1], y[i])
}

for (let i = n - 2; i > -1; i--) {
  sufmin[i] = Math.min(sufmin[i + 1], y[i])
  sufmax[i] = Math.max(sufmax[i + 1], y[i])
}

let l = 0
let r = Math.min(w, h)

while (l < r) {
  const m = (l + r) >> 1
  if (check(m)) r = m
  else l = m + 1
}

console.log(l)


