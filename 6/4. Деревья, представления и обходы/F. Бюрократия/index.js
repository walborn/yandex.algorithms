const fs = require('fs')
const test = 2
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
// const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/

const n = Number(input())

const parents = input().split(' ').map(i => Number(i) - 1)

const children = Array.from({ length: n }, () => [])
for (let i = 0; i < n - 1; i++) children[parents[i]].push(i + 1)
// const dfs = (a) => {
//   return coins[a] = [1, ...children[a].map(i => dfs(i)).reduce((r, i) => r.concat(i), []).map(i => i + 1) ]
// }

const descendants = []
const dfs = (a) => descendants[a] = 1 + children[a].map(dfs).reduce((r, i) => r + i, 0)
dfs(0)

const coins = []
const dfs2 = (a) => coins[a] = 1 + children[a].map(i => dfs2(i) + descendants[i]).reduce((r, i) => r + i, 0)
dfs2(0)
// const ans = coins.map(i => i.reduce((r, i) => r + i, 0)).join(' ')
console.log(coins.join(' '))
/*
fs.writeFileSync('output.txt', coins.join(' '))
*/
