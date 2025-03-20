const fs = require('fs')
const test = 1
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').trim().split('\n')
const __ans__ = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8').trim()

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/

const n = Number(input()) - 1

const parents = {}

for (let i = 0; i < n; i++) {
  const [ child, parent ] = input().split(' ')
  parents[child] = parent
}

let a, b, request, ans = []
while (request = input()) {
  [ a, b ] = request.split(' ')
  const aParents = new Set([a])
  while (a = parents[a]) aParents.add(a)
  while (!aParents.has(b)) b = parents[b]

  ans.push(b)
}

/*
fs.writeFileSync('output.txt', ans.join('\n'))
*/
