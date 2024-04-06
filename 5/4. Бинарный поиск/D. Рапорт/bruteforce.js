// задача не решается на js даже с BigInt, поскольку 10**18 слишком большое число
// переписал на python - все заработало

const fs = require('fs')
const testcase = 18
const input = fs.readFileSync(`${__dirname}/tests/${testcase}`, 'utf8').split('\n')
const start = Date.now()
// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').split('\n')
//*/

const binarySearch = (l, r, check, ...args) => {
  while (l < r) {
    const m = (l + r + 1) >> 1
    if (check(m, ...args)) l = m
    else r = m - 1
  }
  return l
}


const [w, n, m] = input.shift().split(' ').map(Number)
const a = input.shift().split(' ').map(Number)
const b = input.shift().split(' ').map(Number)

const maxa = Math.max(...a)
const maxb = Math.max(...b)

const getRows = (a, width) => {
  let acc = a[0]
  let rows = 1

  for (let i = 1; i < a.length; i++) {
    if (acc + 1 + a[i] > width) {
      acc = a[i]
      rows++
    } else {
      acc += 1 + a[i]
    }
  }
  return rows
}

let minRows = n + m
console.log(maxa, w - maxb)
for (let i = maxa; i <= w - maxb; i++) {
  const rowsa = getRows(a, i)
  const rowsb = getRows(b, w - i)
  console.log(rowsa, rowsb)
  if (minRows > Math.max(rowsa, rowsb)) {
    minRows = Math.max(rowsa, rowsb)
  }
}
console.log(minRows)
console.log(Date.now() - start)
/*
fs.writeFileSync('output.txt', minRows.toString())

*/


// const answer = fs.readFileSync(`${__dirname}/tests/answers/${testcase}.a`, 'utf8').split('\n').map(Number)

// for (let i = 0; i < result.length; ++i) {
//   if (result[i] !== answer[i]) {
//     console.log(i, result[i], answer[i])
//   }
// }

