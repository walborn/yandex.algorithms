// задача не решается на js даже с BigInt, поскольку 10**18 слишком большое число
// переписал на python - все заработало

const fs = require('fs')
const testcase = 49
const input = fs.readFileSync(`${__dirname}/tests/${testcase}`, 'utf8').split('\n')

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


const n = BigInt(+input[0])

const check = (k, n) => n >= (k * (k + 1n) / 6n) * (k + 5n) - 1n

const result = binarySearch(0n, n, check, n)
console.log(result.toString())
// 1800999

/*
fs.writeFileSync('output.txt', result.toString())

*/


// const answer = fs.readFileSync(`${__dirname}/tests/answers/${testcase}.a`, 'utf8').split('\n').map(Number)

// for (let i = 0; i < result.length; ++i) {
//   if (result[i] !== answer[i]) {
//     console.log(i, result[i], answer[i])
//   }
// }

