const testcase = 1

const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/tests/${testcase}`, 'utf8').split('\n')

console.log(input)
// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').split('\n')
//*/

const binarySearch = (l, a, x) => {
  let r = a.length - 1

  while (l < r) {
    const m = (l + r) >> 1
    if (a[m] >= x) r = m
    else l = m + 1
  }
  return l
}

const n = +input[0]
const a = input[1].split(' ').map(Number).sort((x, y) => x - y)
a.push(10 ** 9)
ans = []

const k = +input[2]
for (let i = 3; i < k + 3; i++) {
  const [l, r] = input[i].split(' ').map(Number)
  const L = binarySearch(0, a, l)
  const R = binarySearch(L, a, r + 1)
  ans.push(R - L)
}


/*//
fs.writeFileSync('output.txt', ans.join(' '))

*/

