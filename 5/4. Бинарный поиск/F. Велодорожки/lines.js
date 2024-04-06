const testcase = 1

const fs = require('fs')
const readline = require('readline')

const fileStream = fs.createReadStream(`${__dirname}/tests/${testcase}`)

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
})
// Note: we use the crlfDelay option to recognize all instances of CR LF
// ('\r\n') in input.txt as a single line break.


const start = Date.now()
// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const readline = require('readline')
const fileStream = fs.createReadStream('input.txt')

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
})
//*/

const it = rl[Symbol.asyncIterator]()
const input = async () => (await it.next()).value

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

const [w, h, n] = (await input()).split(' ').map(Number)

const a = []
for await (const line of rl) a.push(line.split(' ').map(Number))
a.sort((a, b) => a[0] - b[0])

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
