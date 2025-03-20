// не проходит 152 тест, так как слишком большие числа, нужно решать на python
const fs = require('fs')
const test = 1
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/
const b = Number(input().split(' ')[1])
const a = input().split(' ').map(Number)


let queue = 0
let ans = 0

for (const i of a) {
  queue += i
  ans += queue
  queue -= Math.min(queue, b)
}

console.log(ans + queue)
/*
fs.writeFileSync('output.txt', `${ans + queue}`)
*/
