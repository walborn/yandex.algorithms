const fs = require('fs')
const test = 6
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
// const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/

let [ n, m ] = input().split(' ').map(i => --i)
const x = input().trim().split(' ').map((i, j) => [+i, j]).sort(([i], [j]) => i - j)
const y = input().trim().split(' ').map((i, j) => [--i, ++j]).sort(([i], [j]) => i - j)

console.log(x)
console.log(y)
let ans = []
while (n > -1 && m > -1) {
  console.log(n, m, x[n], y[m], x[n][0] > y[m][0], y[m][1])
  ans[x[n][1]] = ((x[n--][0] > y[m][0]) ? 0 : y[m--][1])
}

console.log(ans)
/*
fs.writeFileSync('output.txt', `${ans.filter(Boolean).length}\n${ans.join('\n')}`)
*/
