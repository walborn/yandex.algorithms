const fs = require('fs')
const testcase = 2
const __input__ = fs.readFileSync(`${__dirname}/tests/${testcase}`, 'utf8').split('\n')

const input = ((i = 0) => () => __input__[i++])()

const start = Date.now()
// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/


const waterright = (now, ynow) => {
  const poly = [[x[now], ynow], [x[now], y[now]]]

  let j = now + 1
  for (; j < n + 2; j++) {
    if (y[j] > ynow) break
    poly.push([x[j], y[j]])
  }

  const lastx = x[j - 1] + (x[j] - x[j - 1]) * (ynow - y[j - 1]) / (y[j] - y[j - 1])
  poly.push([lastx, ynow])
  poly.push([x[now], ynow])
  let square = 0

  for (let i = 0; i < poly.length - 1; i++) {
    square += poly[i][0] * poly[i + 1][1] - poly[i][1] * poly[i + 1][0]
  }
  square = Math.abs(square) / 2
  water = (x[j] - x[now]) * h + sufadd[j]
  return water - square
}

const waterleft = (now, ynow) => {
  const poly = [[x[now], ynow], [x[now], y[now]]]

  let j = now - 1
  for (; j >= 0; j--) {
    if (y[j] > ynow) break
    poly.push([x[j], y[j]])
  }
  const lastx = x[j + 1] + (x[j + 1] - x[j]) * (y[j + 1] - ynow) / (y[j] - y[j + 1])

  poly.push([lastx, ynow], [x[now], ynow])
  let square = 0

  for (let i = 0; i < poly.length - 1; i++) {
    square += poly[i][0] * poly[i + 1][1] - poly[i][1] * poly[i + 1][0]
  }
  square = Math.abs(square) / 2
  water = (x[now] - x[j]) * h + prefadd[j]
  return water - square
}

const check = (m) => {
  for (let i = 1; i < n + 1; i++) {
    if (y[i - 1] > y[i] && y[i] < y[i + 1]) {
      square = waterleft(i, y[i] + m) + waterright(i, y[i] + m)
      if (square >= 0) return true
    }
  }
  return false
}

let [n, h] = input().split(' ')

n = +n + 1
h = +h

const x = []
const y = []

for (let i = 0; i < n; i++) {
  const [a, b] = input().split(' ').map(Number)

  x.push(a)
  y.push(b)
}

x.unshift(x[0])
x.push(x.at(-1))
y.unshift(10 ** 10)
y.push(10 ** 10)

const sufadd = Array(n + 2).fill(0)
for (let i = n; i > 0; i--) {
  sufadd[i] = Math.max(0, waterright(i, y[i]))
}

const prefadd = Array(n + 2).fill(0)
for (let i = 1; i < n + 1; i++) {
  prefadd[i] = Math.max(0, waterleft(i, y[i]))
}

let l = 0
let r = 10 ** 10

while (r - l > 0.000001) {
  const m = (l + r) / 2
  if (check(m)) l = m
  else r = m
}

console.log(l)
/*
fs.writeFileSync('output.txt', `${l}`)
*/


// const answer = fs.readFileSync(`${ __dirname } / tests / answers / ${ testcase }.a`, 'utf8').split('\n').map(Number)

// for (let i = 0; i < result.length; ++i) {
//   if (result[i] !== answer[i]) {
//     console.log(i, result[i], answer[i])
//   }
// }
