const fs = require('fs')
const test = 1
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
const __ans__ = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8').trim()

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/

const n = Number(input()) - 1

const tree = {}

for (let i = 0; i < n; i++) {
  const [ child, parent ] = input().split(' ')
  if (!tree[parent]) tree[parent] = []
  tree[parent].push(child)
}

const children = new Set(Object.values(tree).flat())
const descendants = {}
const root = Object.keys(tree).find(parent => !children.has(parent))

const queue = [ [ root, null ] ]
let i = -1
while (i < n) {
  const [ node ] = queue[++i]
  if (tree[node]) queue.push(...tree[node].map(child => [ child, node ]))
}

for (const child of children) descendants[child] = 1
descendants[root] = 1

while (queue.length) {
  const [ node, parent ] = queue.pop()
  if (parent) descendants[parent] += descendants[node]
}
const ans = Object.entries(descendants).map(([name, count]) => `${name} ${count - 1}`).sort().join('\n')
/*
fs.writeFileSync('output.txt', ans)
*/
