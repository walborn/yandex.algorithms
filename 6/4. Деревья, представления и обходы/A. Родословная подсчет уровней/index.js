const fs = require('fs')
const test = 2
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

console.log(tree)

const children = new Set(Object.values(tree).flat())
console.log(children)
const root = Object.keys(tree).find(parent => !children.has(parent))
console.log(root)


const queue = [ [ root, 0 ] ]
let i = -1
while (i < n) {
  const [ parent, level ] = queue[++i]
  if (tree[parent]) queue.push(...tree[parent].map(child => [ child, level + 1 ]))
}

const ans = queue.map(([name, level]) => `${name} ${level}`).sort().join('\n')
console.log(ans)
console.log(__ans__)
/*
fs.writeFileSync('output.txt', ans)
*/
