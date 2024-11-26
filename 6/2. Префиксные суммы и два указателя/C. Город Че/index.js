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
const [n, r] = input().split(' ').map(Number)
const a = input().split(' ').map(Number)

let i = 0, j = 1, c = 0
while (j < n) {
  if (a[j] - a[i] > r) (i++, c += n - j)
  else j++
}

console.log(c)
/*
fs.writeFileSync('output.txt', `${c}`)
*/
