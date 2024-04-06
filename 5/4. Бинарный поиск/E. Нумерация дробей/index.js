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

// const n = +input[0]

for (let n = 1; n < 23; n++) {

  let a = 1, b = 1

  // 2 * x**2 + x - n = 0

  const x = (-1 + Math.sqrt(1 + 8 * n)) >> 2

  a = n - x * (2 * x + 1)
  b = 2 * (x + 1) - a
  if (a === 0) {
    a = 1; b -= 2
  }
  if (b <= 0) b = 1 - b
  if (a >= 2 * (x + 1)) a = 2 * (x + 1) - (a - 2 * (x + 1))

  console.log(`${a}/${b}`)
}
// console.log(6253, 2222)
console.log(Date.now() - start)
/*
fs.writeFileSync('output.txt', `${a}/${b}`)

*/


// const answer = fs.readFileSync(`${__dirname}/tests/answers/${testcase}.a`, 'utf8').split('\n').map(Number)

// for (let i = 0; i < result.length; ++i) {
//   if (result[i] !== answer[i]) {
//     console.log(i, result[i], answer[i])
//   }
// }

