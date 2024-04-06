const fs = require('fs')
const test = i => `${__dirname}/tests/` + i
const input = fs.readFileSync(test(3), "utf8").split('\n')

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').split('\n')
//*/

const problem = (n, k, a) => {
  const dic = {}
  for (let i = 0; i < Math.min(k, n); i++) {
    if (dic[a[i]]) return 'YES'
    dic[a[i]] = (dic[a[i]] || 0) + 1
  }

  for (let i = k; i < n; i++) {
    if (dic[a[i]]) return 'YES'
    dic[a[i - k]]--
    dic[a[i]] = (dic[a[i]] || 0) + 1
  }
  return 'NO'
}

const [n, k] = input[0].split(' ').map(Number)
const a = input[1].split(' ').map(Number)

const result = problem(n, k, a)
console.log(result)
/*
fs.writeFileSync('output.txt', result.toString())

*/

