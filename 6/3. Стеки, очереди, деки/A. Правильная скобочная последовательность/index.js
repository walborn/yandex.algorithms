const fs = require('fs')
const test = 2
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
const brackets = (s) => {
  if (!s.length) return true
  const opened = []
  const binds = { '(': ')', '{': '}', '[': ']' }
  for (let i of s) {
    if (i in binds) opened.push(i)
    else if (i !== binds[opened.pop()]) return false
  }

  return !opened.length
}

console.log(brackets(s) ? 'yes' : 'no')
console.log(__ans__)
/*
fs.writeFileSync('output.txt', `${brackets(s) ? 'yes' : 'no'}`)
*/
