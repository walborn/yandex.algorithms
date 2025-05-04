const fs = require('fs')
const test = 2
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
// const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/

class Stack {
  constructor() {
    this.stack = []
  }

  push(n) {
    this.stack.push(n)
    return 'ok'
  }

  pop() {
    return this.stack.length ? this.stack.pop() : 'error'
  }

  back() {
    return this.stack.length ? this.stack.at(-1) : 'error'
  }

  size() {
    return this.stack.length
  }

  clear() {
    this.stack = []
    return 'ok'
  }

  exit() {
    this.stack = []
    return 'bye'
  }
}


const stack = new Stack()

while (i = input()) {
  const command = i.slice(0, 4)

  if (command === 'push') {
    console.log(stack.push(parseInt(i.slice(5))))
  } else if (command === 'pop') {
    console.log(stack.pop())
  } else if (command === 'back') {
    console.log(stack.back())
  } else if (command === 'size') {
    console.log(stack.size())
  } else if (command === 'clea') {
    console.log(stack.clear())
  } else if (command === 'exit') {
    console.log(stack.exit())
    break
  }
}
/*
fs.writeFileSync('output.txt', `${ans.filter(Boolean).length}\n${ans.join('\n')}`)
*/
