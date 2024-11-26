const fs = require('fs')
const test = 1
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
const __ans__ = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8').trim()

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/
const s = input()
const check = (s) => {
  const closing = { ')': '(', '}': '{', ']': '[' }
  const stack = []
  for (let c of s) {
    if (c in closing) {
      if (stack.pop() !== closing[c]) return false
    } else {
      stack.push(c)
    }
  }

  return !stack.length
}

console.log(check(s) ? 'yes' : 'no')
console.log(__ans__)
/*
fs.writeFileSync('output.txt', `${check(s) ? 'yes' : 'no'}`)
*/
