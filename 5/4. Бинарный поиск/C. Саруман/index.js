// задача не решается на js даже с BigInt, поскольку 10**18 слишком большое число
// переписал на python - все заработало

const fs = require('fs')
const testcase = 5
const input = fs.readFileSync(`${__dirname}/tests/${testcase}`, 'utf8').split('\n')
const start = Date.now()
// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').split('\n')
//*/

const binarySearch = (l, r, check, ...args) => {
  while (l < r) {
    const m = (l + r + 1n) >> 1n
    if (check(m, ...args)) l = m
    else r = m - 1n
  }
  return l
}


const [n, m] = input[0].split(' ').map(BigInt)
const a = input[1].split(' ').map(BigInt)

const p = [0n]
let prev = 0n
for (const i of a) p.push(prev += i)

const ans = []
for (let i = 0; i < m; i++) {
  const [l, s] = input[i + 2].split(' ').map(BigInt)
  const j = binarySearch(0n, n - l, (x) => p[x + l] - p[x] <= s)
  if (p[j + l] - p[j] === s) ans.push(j + 1n)
  else ans.push(-1n)
}

console.log(ans)
console.log(Date.now() - start)
/*
fs.writeFileSync('output.txt', ans.join('\n'))

*/


// const answer = fs.readFileSync(`${__dirname}/tests/answers/${testcase}.a`, 'utf8').split('\n').map(Number)

// for (let i = 0; i < result.length; ++i) {
//   if (result[i] !== answer[i]) {
//     console.log(i, result[i], answer[i])
//   }
// }

