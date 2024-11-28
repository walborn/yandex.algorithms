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
const n = Number(input())

const stack = [0]
const ans = []
for (let i = 0; i < n; i++) {
  const next = input()
  const op = next[0]
  const num = Number(next.slice(1))

  if (op === '-') if (stack.length > 1) ans.push(stack.pop() - stack.at(-1))
  if (op === '+') stack.push(stack.at(-1) + num)
  if (op === '?') ans.push(stack.at(-1) - stack.at(-num - 1))
}

console.log(ans.join('\n'))

/*
fs.writeFileSync('output.txt', `${ans.join('\n')}`)
*/
