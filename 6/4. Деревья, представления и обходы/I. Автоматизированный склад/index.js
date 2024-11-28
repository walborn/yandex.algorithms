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

let n = Number(input())
const [ a, b ] = input().split(' ').map(i => +i - 1)

const ans = Array(n).fill(-1)

const qs = Array.from({ length: 4 }, () => [])
for (let i = 0; i < n; i++) {
  const [ d, t ] = input().split(' ').map(Number)
  qs[d - 1].push({ i, t })
}

for (let i = 0; i < 4; i++) qs[i].sort((a, b) => a.t - b.t)


const isMain = i => i === a || i === b
const right = i => (i + 3) % 4
 
const canGo = i => qs[i].length && qs[i][0].t <= time

let time = 1

while (n) {
  const moves = []

  for (let dir = 0; dir < 4; dir++) {
    if (!canGo(dir)) continue
    const r = right(dir)
    if (isMain(dir) && isMain(r) && canGo(r)) continue
    if (!isMain(dir) && (canGo(r) || canGo(a) || canGo(b))) continue
    ans[qs[dir][0].i] = time
    moves.push(dir)
  }

  for (let dir of moves) qs[dir].shift()
  n -= moves.length

  time++
}

console.log(ans)
console.log(answer === ans.join('\n'))
/*
fs.writeFileSync('output.txt', ans.join('\n'))
*/
