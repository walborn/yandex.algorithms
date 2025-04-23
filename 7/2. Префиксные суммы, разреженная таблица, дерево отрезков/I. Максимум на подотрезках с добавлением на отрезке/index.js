const fs = require('fs')
const test = 2
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
// const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/

const n = Number(input())
const a = input().trim().split(' ').map(Number)
const q = Number(input())
const k = Math.ceil(Math.log2(n))


const op = (x, y) => {
  if (x[0] === y[0]) return [x[0], x[1] + y[1]]
  return x[0] > y[0] ? x : y
}
const o = [0, 1]


const build = (a) => {
  const t = Array(2 * 2 ** k).fill(o)
  for (let i = 0; i < n; i++) t[2 ** k + i] = [a[i], 1]
  for (let i = 2 ** k - 1; i; i--) t[i] = op(t[2 * i], t[2 * i + 1])
  return t
}

const t = build(a)
t
const query = (i, tl, tr, l, r) => {
  console.log(i, tl, tr, l, r)
  if (l > r) return o
  if (l === tl && r === tr) {
    console.log(l, tl, r, tr, t[i])
    return t[i]
  }
  const tm = (tl + tr) >> 1

  const x = query(i * 2, tl, tm, l, Math.min(r, tm))
  const y = query(i * 2 + 1, tm + 1, tr, Math.max(l, tm + 1), r)
  console.log(x, y, op(x, y))
  return op(x, y)
}

for (let i = 0; i < q; i++) {
  const [l, r] = input().split(' ').map(Number)
  console.log(query(1, 0, 2 ** k - 1, l - 1, r - 1))
}
/*
fs.writeFileSync('output.txt', `${ans.filter(Boolean).length}\n${ans.join('\n')}`)
*/
