const fs = require('fs')
const test = 2
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
const __ans__ = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')
const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/

class BinaryTree {
  constructor() {
    this.tree = {}
    this.root = null
  }

  add(value) {
    if (this.tree[value]) return false
    if (!this.root) {
      this.root = value
      return this.tree[value] = []
    }

    let node = this.root
    while(true) {
      if (value < node) {
        if (!this.tree[node][0]) {
          this.tree[node][0] = value
          return this.tree[value] = []
        }
        node = this.tree[node][0]
      } else {
        if (!this.tree[node][1]) {
          this.tree[node][1] = value
          return this.tree[value] = []
        }
        node = this.tree[node][1]
      }
    }
  }
  has(value) {
    return Boolean(this.tree[value])
  }
  print(node = this.root, depth = 0) {
    let ans = ''
    const [ left, right ] = this.tree[node]
    if (left) ans += `${this.print(left, depth + 1)}`
    ans += `${'.'.repeat(depth)}${node}\n`
    if (right) ans += `${this.print(right, depth + 1)}`
    return ans
  }
}

const binaryTree = new BinaryTree()

const ans = []
while (request = input()) {
  const [ command, value ] = request.split(' ')
  switch (command) {
    case 'ADD':
      ans.push(binaryTree.add(+value) ? 'DONE' : 'ALREADY')
      break
    case 'SEARCH':
      ans.push(binaryTree.has(+value) ? 'YES' : 'NO')
      break
    case 'PRINTTREE':
      ans.push(binaryTree.print())
      break
  }
}
console.log(binaryTree.tree)
console.log(ans.join('\n'))

/*
fs.writeFileSync('output.txt', ans.join('\n'))
*/
