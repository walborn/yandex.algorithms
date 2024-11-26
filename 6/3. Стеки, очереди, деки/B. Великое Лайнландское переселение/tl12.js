const fs = require('fs')
const test = 1
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/
const n = Number(input())
const a = input().split(' ').map(Number)

for (let i = 0; i < n; i++) {
  let j = i
  while (a[++j] >= a[i]);
  a[i] = j === n ? -1 : j
}

console.log(a.join(' '))
const ans = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')
console.log(ans)
console.log(ans === a.join(' '))

/*
fs.writeFileSync('output.txt', a.join(' '))
*/
