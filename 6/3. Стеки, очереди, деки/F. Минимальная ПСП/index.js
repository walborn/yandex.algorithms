const fs = require('fs')
const test = 3
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
// const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/
const n = input()
const b = input()
const a = input().split('')

const pairs = { ')': '(', ']': '[' }
const stack = []

for (const i of a) (/[[(]/.test(i) ? stack.push(i) : stack.pop())

// l - сколько осталось скобочек до полного количества
for (let l = n - a.length; l > -1; l--) {
  for (const j of b) {
    if (stack.length && stack.at(-1) === pairs[j]) {
      a.push(j)
      stack.pop()
      break
    } 
    
    if (/[[(]/.test(j) && l > stack.length) {
      a.push(j)
      stack.push(j)
      break
    }
  }
}
console.log(a.join(''))
/*
fs.writeFileSync('output.txt', a.join(''))
*/
