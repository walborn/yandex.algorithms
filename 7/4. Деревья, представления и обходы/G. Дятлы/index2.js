const fs = require('fs')
const test = 4
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/

const [ n, m, k ] = input().split(' ').map(Number)

const factorial = [1, 1]
for (let i = 2; i < n + 1; i++) factorial[i] = factorial[i - 1] * i % k
const g = Array.from({ length: n }, () => [])

for (let i = 0; i < m; i++) {
  const [ u, v ] = input().split(' ').map(i => Number(i) - 1)
  g[u].push(v)
  g[v].push(u)
}

const solve = () => {
  let ans = 1

  let lonely = g.filter(i => !i.length).length
  for (let i = 0; i < lonely; i++) ans = (ans * (1 + n - i)) % k

   const w = Array(n).fill(0)
  for (let i = 0; i < n; i++) if (g[i].length === 1 && !w[i]) {
    w[j = g[i].pop()]++
    g[j].splice(g[j].indexOf(i), 1)
  }

  let chains = 0

  for (let i = 0; i < n; i++) {
    if (g[i].length === 0 && w[i]) {
      chains++
      ans = (ans * factorial[w[i]] * 2) % k
    }
  }

  for (let i = 0; i < n; i++) {
    if (g[i].length === 0) continue
    if (g[i].length === 2) continue
    if (g[i].length > 2) return 0

    chains++
    let j = i
    ans = (ans * factorial[w[j]]) % k
    while (g[j].length === 1) {
      g[g[j]].splice(g[g[j]].indexOf(j), 1)
      ans = (ans * factorial[w[j = g[j].pop()]]) % k
    }
    if (g[j].length) return 0

    ans = (ans * 4) % k
  }

  for (const i of g) if (i.length) return 0

  ans = (ans * factorial[chains]) % k

  return ans 
}

console.log(solve())
/*
fs.writeFileSync('output.txt', `${solve()}`)
*/
