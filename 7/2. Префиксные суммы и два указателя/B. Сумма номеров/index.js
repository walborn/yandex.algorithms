const fs = require('fs')
const test = 2
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/
const [n, k] = input().split(' ').map(Number)
const a = [ 0, ...input().split(' ').map(Number) ]
for (let i = 1; i <= n; i++) a[i] += a[i - 1]

let i = 0, j = 1, c = 0
  
while (j <= n) {
  if (a[j] - a[i] < k) j++
  else if (a[j] - a[i] > k) i++
  else c++, i++, j++
}
console.log(c)
/*
fs.writeFileSync('output.txt', `${c}`)
*/
