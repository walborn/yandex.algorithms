const fs = require('fs')
const test = 35
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
  
const ans = Array(n).fill(0)
const mining = (i) => {
  let descendants = 1
  for (const j of children[i]) {
    const [jc, jd] = mining(j)
    ans[i] += jc + jd
    descendants += jd
  }
  return [++ans[i], descendants]
}

mining(0)

console.log(ans.join(' '))
/*
fs.writeFileSync('output.txt', ans.join(' '))
*/
