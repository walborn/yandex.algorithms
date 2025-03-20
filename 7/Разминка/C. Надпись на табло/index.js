const fs = require('fs')
const test = 8
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/

const n = Number(input())
const m = n + 2

const a = Array.from({ length: n }, () => `.${input()}.`)

const solve = (a, n, m) => {
  const empty = '.'.repeat(m)
  while (a[0] === empty) a.shift()
  while (a.at(-1) === empty) a.pop()
  
  if (a.length === 0) return 'X'

  let n = 1
  for (let i = 1; i < a.length; i++) {
    if (a[i] !== a[i-1]) a[n++] = a[i]
  }

  const b = Array.from({ length: n }, () => [])

  for (let i = 0; i < n; i++) {
    for (let j = 1; j < m; j++) {
      if (a[i][j] !== a[i][j - 1]) b[i].push(j)
    }
  }

  if (n === 0) return 'X'

  const x = b.pop()
  // I
  if (n === 1) {
    if (x.length !== 2) return 'X'
    return 'I'
  }
  const y = b.pop()
  // L
  if (n === 2) {
    if (x.length !== 2) return 'X'
    if (y.length !== 2) return 'X'
    if (x[0] !== y[0]) return 'X'
    if (x[1] < y[1]) return 'X'
    return 'L'
  }
  const z = b.pop()
  // O, H, C, 
  if (n === 3) {
    if (x.length === 2
      && y.length === 4
      && z.length === 2
      && x.join(' ') === z.join(' ')
      && x[0] === y[0] && x[1] === y[3]
    ) return 'O'
    if (x.length === 4
      && y.length === 2
      && z.length === 4
      && x.join(' ') === z.join(' ')
      && y[0] === x[0] && y[1] === x[3]
    ) return 'H'
    if (x.length === 2
      && y.length === 2
      && z.length === 2
      && x.join(' ') === z.join(' ')
      && x[0] === y[0] && x[1] > y[1]
    ) return 'C'
    return 'X'
  }
  
  const t = b.pop()
  // P
  console.log(a)
  console.log(x, y, z, t)
  if (n === 4) {
    if (x.length === 2
      && y.length === 2
      && z.length === 4
      && t.length === 2
      && y.join(' ') === t.join(' ')
      && x[0] === y[0]
      && x[0] === t[0]
      && y[1] === z[3]
      && x[1] === z[1]
    ) return 'P'
    return 'X'
  }
  return 'X'
}

console.log(solve(a))
/*
fs.writeFileSync('output.txt', solve(a))
*/
