const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()


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
  print(node = this.root, depth = -1) {
    let ans = `${'.'.repeat(++depth)}${node}`
    if (!this.tree[node].length) return ans
    const [ left, right ] = this.tree[node]
    if (left) ans += `\n${this.print(this.tree[node][0], depth)}`
    if (right) ans += `\n${this.print(this.tree[node][1], depth)}`
    return ans
  }
}

const binaryTree = new BinaryTree()

const ans = []
while (request = input()) {
  const [ command, value ] = request.split(' ')
  console.log(command, value)
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

fs.writeFileSync('output.txt', ans.join('\n'))