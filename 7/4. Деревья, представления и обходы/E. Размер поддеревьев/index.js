const fs = require('fs')
const test = 1
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').trim().split('\n')
const input = ((i = 0) => () => __input__[i++])()
// const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')


// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/
const V = Number(input())
const neighbors = Array.from({ length: V + 1 }, () => [])

for (let i = 0; i < V - 1; i++) {
  const [ u, v ] = input().split(' ')
  neighbors[u].push(v)
  neighbors[v].push(u)
}

const descendants = Array(V + 1).fill(0)

const dfs = (u) => {
  descendants[u] = 1
  for (const v of neighbors[u]) if (!descendants[v]) descendants[u] += dfs(v)
  return descendants[u]
}

dfs(1)
console.log(descendants.slice(1).join(' '))
/*
fs.writeFileSync('output.txt', descendants.slice(1).join(' '))
*/
