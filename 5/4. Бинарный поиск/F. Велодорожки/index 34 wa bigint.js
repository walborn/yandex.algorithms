const fs = require('fs')
const testcase = 3
const input = fs.readFileSync(`${__dirname}/tests/${testcase}`, 'utf8').split('\n')
const start = Date.now()
// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').split('\n')
//*/

const [w, h, n] = input[0].split(' ').map(BigInt)

const tiles = {}
for (let i = 1n; i < n + 1n; i++) {
  const [x, y] = input[i].split(' ').map(BigInt)
  if (!tiles[y]) tiles[y] = []
  tiles[y].push(x)
}


const a = [w]
const b = [1]
const c = [w]
const d = [1]

let i = 0

Math.max = (x, ...args) => args.reduce((r, i) => r > i ? r : i, x)
Math.min = (x, ...args) => args.reduce((r, i) => r < i ? r : i, x)

while (a[i] && ++i <= h) {
  a[i] = a[i - 1]
  if (tiles[i]) a[i] = Math.min(a[i], Math.min(...tiles[i]) - 1n)
}
i = 0
while (b[i] <= w && ++i <= h) {
  b[i] = b[i - 1]
  if (tiles[i]) b[i] = Math.max(b[i], Math.max(...tiles[i]) + 1n)
}
i = h + 1n
while (c.at(-1) && --i) {
  if (tiles[i]) c.push(Math.min(c.at(-1), Math.min(...tiles[i]) - 1n))
  else c.push(c.at(-1))
}
i = h + 1n
while (d.at(-1) < w && --i) {
  if (tiles[i]) d.push(Math.max(d.at(-1), Math.max(...tiles[i]) + 1n))
  else d.push(d.at(-1))
}


let ans = Math.min(w, h) - 1n

const check = (i, j, width) => {
  const x = { i, j }
  const y = { i, j: j + width + 1n }
  const z = { i: h + 1n - (i + width + 1n), j }
  const t = { i: h + 1n - (i + width + 1n), j: j + width + 1n }

  if ((a[x.i] || 0) < x.j) return false
  if ((b[y.i] || w) > y.j) return false
  if ((c[z.i] || 0) < z.j) return false
  if ((d[t.i] || w) > t.j) return false
  return true
}


for (let i = 0n; i < h - ans; i++) {
  for (let j = 0n; j <= (a[i] || 0n); j++) {
    while (check(i, j, ans) && ans) ans--
  }
}

console.log(ans + 1n)
console.log(Date.now() - start)

/*
fs.writeFileSync('output.txt', `${ans + 1n}`)

*/


// const answer = fs.readFileSync(`${__dirname}/tests/answers/${testcase}.a`, 'utf8').split('\n').map(Number)

// for (let i = 0; i < result.length; ++i) {
//   if (result[i] !== answer[i]) {
//     console.log(i, result[i], answer[i])
//   }
// }

