const fs = require('fs')
const testcase = 1
const __input__ = fs.readFileSync(`${__dirname}/tests/${testcase}`, 'utf8').split('\n')

const input = ((i = 0) => () => __input__[i++])()

const start = Date.now()
// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()
//*/

const n = +input()

let parties = []
for (let i = 0; i < n; i++) parties.push([...input().split(' ').map(Number), i])
parties.sort(([a], [b]) => a - b)

let votes = []
const bribes = []
const keys = []

for (const [vote, bribe, key] of parties) {
  votes.push(vote)
  bribes.push(bribe)
  keys.push(key)
}

const suffixsum = [...votes]
for (let i = n - 2; i > -1; i--) suffixsum[i] += suffixsum[i + 1]

const binarySearch = (l, r, check) => {
  while (l < r) {
    const m = (l + r) >> 1
    if (check(m)) r = m
    else l = m + 1
  }
  return l
}
const rbinarySearch = (l, r, check) => {
  while (l < r) {
    const m = (l + r + 1) >> 1
    if (check(m)) r = m - 1
    else l = m
  }
  return l
}

// votes above level 
const above = (i, level) => {
  // найдем первую партию, у которой голосов больше уровня
  let j = binarySearch(0, votes.length - 1, x => votes[x] > level)

  // если не нашли такую
  if (j === votes.length) return 0
  // console.log(i, level, j)
  // console.log(suffixsum[j], level * (votes.length - j), votes[i] - level)

  const result = suffixsum[j]
    - level * (votes.length - j)
    - Math.max(0, votes[i] - level) // убираем свои голоса

  // console.log(level, result)
  return result
}

const solve = (i) => {
  const check = (m) => votes[i] + above(i, m, votes, suffixsum) <= m
  const level = rbinarySearch(0, votes.at(-1), check)

  console.log(i, level)
  const cost = above(i, level, votes, suffixsum)

  // если запас голосов > 2, то можем вернуть их
  const votesback = Math.max(0, votes[i] + cost - (level + 2))

  return [cost - votesback, level, votesback]
}


let mincost = Number.MAX_VALUE
let ans = []

for (let i = 0; i < n; i++) {
  if (bribes[i] === -1) continue
  const [cost, level, votesback] = solve(i)

  if (bribes[i] + cost < mincost) {
    mincost = bribes[i] + cost
    ans = [i, cost, level, votesback]
  }
}

let [winner, cost, level, votesback] = ans


for (let i = 0; i < n; i++) {
  if (i === winner) votes[winner] += cost
  else if (votes[i] > level) {
    votes[i] = level
    if (votesback-- > 0) votes[i]++
  }
}

parties = []
for (let i = 0; i < n; i++) parties.push([keys[i], votes[i]])
votes = parties.sort((a, b) => a[0] - b[0]).map(x => x[1])

console.log(Date.now() - start)

console.log(`${mincost}\n${keys[winner] + 1}\n${votes.join(' ')}`)
/*
fs.writeFileSync('output.txt', `${mincost}\n${keys[winner] + 1}\n${votes.join(' ')}`)
*/


// const answer = fs.readFileSync(`${__dirname}/tests/answers/${testcase}.a`, 'utf8').split('\n').map(Number)

// for (let i = 0; i < result.length; ++i) {
//   if (result[i] !== answer[i]) {
//     console.log(i, result[i], answer[i])
//   }
// }

