const fs = require('fs')
const test = 1
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
const __ans__ = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/
const [n, k] = input().split(' ').map(Number)
const a = input().split(' ').map(Number)

const dq = [a[0]]

for (let i = 1; i < k; i++) {
  while (dq.length && dq.at(-1) > a[i]) dq.pop()
  dq.push(a[i])
}

const ans = [ dq[0] ]
for (let i = k; i < n; i++) {
  if (dq[0] === a[i - k]) dq.shift()
  while (dq.length && dq.at(-1) > a[i]) dq.pop()
  dq.push(a[i])
  ans.push(dq[0])
}

console.log(ans.join('\n'))
console.log(__ans__)
/*
fs.writeFileSync('output.txt', `${ans.join('\n')}`)
*/
