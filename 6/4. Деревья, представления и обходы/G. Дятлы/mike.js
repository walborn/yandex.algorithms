// не проходит 152 тест, так как слишком большие числа, нужно решать на python
const { subscribe } = require('diagnostics_channel')
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

const [ n, m, k ] = input().split(' ').map(Number)

const tree = {}

for (let i = 0; i < k; i++) {
  const [ u, v ] = input().split(' ').map(Number)
  if (!tree[u]) tree[u] = []
  if (!tree[v]) tree[v] = []
  tree[u].push(v)
  tree[v].push(u)
}

const variants = () => {
  if (m > n - 1) return 0 // есть цикл

  const factorial = Array(n + 1).fill(1)

  for (let i = 2; i < n + 1; i++) factorial[i] = factorial[i - 1] * i % k
  const g = Array.from({ length: n + 1 }, () => [])
  let bad = false 
  let ans = 1
  let lonely = 0
  let trees = 0
  const visited = Array(n + 1).fill(false)
  for (let i = 0; i < m; i++) {
    const [ a, b ] = input().split(' ').map(Number)
    g[a].push(b)
    g[b].push(a)
  }

  for (let i = 1; i < n + 1; i++) {
    if (g[i].length) lonely++
    else if (!visited[i]) {
      trees++
      getAns(i, true, -1)
    }
  }
  if (bad) return 0
  ans = (ans * factorial[trees]) % k
  let not_lonely = n - lonely
  for (let i = 0; i < not_lonely; i++) {
    ans = (ans * (2 + not_lonely + i)) % k
  }
  return ans 
}

const getAns = (i, isRoot, parent) => {
  if (bad) return 0
  if (isRoot && g[i].length === 1 && g[g[i][0]].length > 1)
    return getAns(g[i][0], true, -1)
  
  visited[i] = true
  let cntBigChilds = 0
  let subtreeSize = 1

  for (const child of g[i]) {
    if (bad) return 0
    if (visited[child] && child !== parent) {
      // bad = true
      // return 0
      return bad = true
    }
    if (!visited[child]) {
      cSize = getAns(child, false, i)
      subtreeSize += cSize
      if (cSize > 1) cntBigChilds++
      if (isRoot && cntBigChilds > 2 || !isRoot && cntBigChilds > 1) {
        // bad = true
        // return 0
        return bad = true
      }
    }
  }
  cntSmallChilds = g[i].length - cntBigChilds - 1 + Number(isRoot)
  ans = ans * factorial[subtreeSize] % k
  if (isRoot) {
    // if (cntSmallChilds === 0 && cntBigChilds === 1) {
    //   ans = (ans * g[g[i][0]][0]) % k
    // }
    ans = (ans * 2) % k
    if (cntSmallChilds && cntBigChilds || cntBigChilds === 2) {
      ans = (ans * 2) % k
    }
    return subtreeSize
  }
}
/*
fs.writeFileSync('output.txt', `${ans + queue}`)
*/
