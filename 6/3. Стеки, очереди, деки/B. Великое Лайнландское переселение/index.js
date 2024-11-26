const fs = require('fs')
const test = 1
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
const __ans__ = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/
const n = Number(input())
const a = input().split(' ').map(Number)

const ans = Array(n).fill(-1)

const stack = []

for (let i = 0; i < n; i++) {
  while (stack.length && a[i] < stack.at(-1)[0]) {
    ans[stack.pop()[1]] = i
  }
  stack.push([a[i], i])
}
  

console.log(ans.join(' '))
console.log(__ans__)
console.log(__ans__ === a.join(' '))

/*
fs.writeFileSync('output.txt', anshttps://contest.yandex.ru/contest/71130/enter.join(' '))
*/
