const fs = require('fs')
const test = 2
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/
input()

let a = input().split(' ').map(Number)
let b = input().split(' ').map(Number)

const c = a.map((i, index) => ({ a: i, b: b[index], i: index }))

a = c.sort((i, j) => (j.a - i.a) || (j.b - i.b)).map(({ i }) => i)
b = c.sort((i, j) => (j.b - i.b) || (j.a - i.a)).map(({ i }) => i)

const x = input().split(' ')
const visited = []

const ans = []
let i = -1
let j = -1

for (const mood of x) {
  if (mood === '1') {
    while (visited[b[++j]]);
    ans.push(b[j])
    visited[b[j]] = true
  } else {
    while (visited[a[++i]]);
    ans.push(a[i])
    visited[a[i]] = true
  }
}

console.log(ans.map(i => i + 1).join(' '))
console.log(answer)
/*
fs.writeFileSync('output.txt', ans.map(i => i + 1).join(' '))
*/
