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

const [n, m] = input().split(' ').map(Number)

const a = []
for (let i = 0; i < n; i++) {
  a.push(input().split(' ').map(Number))
}

for (let i = 1; i < m; i++) a[0][i] += a[0][i - 1]
for (let i = 1; i < n; i++) a[i][0] += a[i - 1][0]



const b = Array.from({ length: n }, () => ['D'])
b[0] = Array.from({ length: m }, () => 'R')

for (let i = 1; i < n; i++) {
  for (let j = 1; j < m; j++) {
    b[i][j] = a[i - 1][j] > a[i][j - 1] ? 'D' : 'R'
    a[i][j] += Math.max(a[i - 1][j], a[i][j - 1])
  }
}

for (let i = 0; i < n; i++) {
  console.log(a[i].join(' '))
}
for (let i = 0; i < n; i++) {
  console.log(b[i].join(' '))
}

let i = n - 1
let j = m - 1

let ans = ''
while (i || j) {
  ans = b[i][j] + ans
  if (b[i][j] === 'D') i -= 1
  else j -= 1
}

console.log(`${a[n - 1][m - 1]}\n${ans}`)

/*
fs.writeFileSync('output.txt', `${a[n - 1][m - 1]}\n${ans}`)
*/
