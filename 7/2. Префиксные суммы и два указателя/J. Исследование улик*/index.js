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
const n = Number(input())
const a = input().split(' ').map(Number)
const k = Number(input().split(' ')[1]) + 1
const x = input().split(' ').map(Number)

let ans = []
// for (let i of x) {
//   let t = k
//   console.log(a[i], a[i - 1])
//   while (i && a[i] >= a[i - 1]) {
//     if (a[i] === a[i - 1] && !t--) break
//     i -= 1
//   }
//   console.log(i, t)
//   ans.push(i + 1)
// }

let t = k
const b = [ 0 ]
for (let l = 0, r = 1; r < n; r++) {
  if (a[r - 1] > a[r]) { l = r; t = k }
  else if (a[r - 1] === a[r]) if (!--t) { while (a[l] !== a[++l]); t = 1}
  b[r] = l
}

console.log(b.join(' '))

console.log(x.map(i => b[i - 1] + 1).join(' '))
console.log(answer)
/*
fs.writeFileSync('output.txt', x.map(i => b[i - 1] + 1).join(' '))
*/
