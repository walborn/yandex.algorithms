const fs = require('fs')
const testcase = 2
const input = fs.readFileSync(`${__dirname}/tests/${testcase}`, 'utf8').split('\n')
const start = Date.now()
// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').split('\n')
//*/

const [n, m] = input.shift().split(' ').map(Number)

const space = [
  undefined,
  ...input.map(row => [false, ...[...row].map(i => i === '#'), false]),
]

const a = Array.from({ length: n + 2 }, () => Array(m + 2).fill(0))
const b = Array.from({ length: n + 2 }, () => Array(m + 2).fill(0))
const c = Array.from({ length: n + 2 }, () => Array(m + 2).fill(0))
const d = Array.from({ length: n + 2 }, () => Array(m + 2).fill(0))
console.log(Date.now() - start)

for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < m + 1; j++) {
    if (space[i][j]) {
      c[i][j] = Math.min(a[i][j] = a[i][j - 1] + 1, b[i][j] = b[i - 1][j] + 1)
    }
  }
}

for (let i = n; i > 0; i--) {
  for (let j = m; j > 0; j--) {
    if (space[i][j]) {
      d[i][j] = Math.min(a[i][j] = a[i][j + 1] + 1, b[i][j] = b[i + 1][j] + 1)
    }
  }
}

console.log(Date.now() - start)
let max = 0
for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < m + 1; j++) {
    let dim = Math.min(c[i][j] - 1, d[i][j] >> 1)
    if (dim > max) {
      for (let k = 1; dim > max && k < dim; k++) {
        const y = i + k
        const x = j + k
        dim = Math.min(dim, c[y][x] - k - 1, (d[y][x] + k) >> 1)
      }
      if (dim > max) max = dim
    }
  }
}
console.log(max)

console.log(Date.now() - start)
/*
fs.writeFileSync('output.txt', `${max}`)

*/


// const answer = fs.readFileSync(`${__dirname}/tests/answers/${testcase}.a`, 'utf8').split('\n').map(Number)

// for (let i = 0; i < result.length; ++i) {
//   if (result[i] !== answer[i]) {
//     console.log(i, result[i], answer[i])
//   }
// }

