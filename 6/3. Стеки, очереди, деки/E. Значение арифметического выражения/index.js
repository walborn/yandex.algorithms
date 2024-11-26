const fs = require('fs')
const test = 4
const input = () => fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').trim()
// const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')


// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/

const evalPostfix = (postfix) => {
  const dq = []

  for (const i of postfix)
    if (/\d+/.test(i)) dq.push(i)
    else dq.push(((a, b) => eval(`${b} ${i} ${a}`))(dq.pop(), dq.pop()))

  return dq[0]
}
const toPostfix = (infix) => {
  const postfix = []
  const stack = []

  let prevNum = false 

  for (const token of infix) {
    console.log(token, prevNum)

    if (/\d+/.test(token)) {
      if (prevNum) return null
      prevNum = true

      postfix.push(token)
      continue
    }

    if (/[-+*]/.test(token)) {
      if (!prevNum) return null // * + или ( +
      prevNum = false
    }

    if (token === '*') {
      while (stack.at(-1) === '*') postfix.push(stack.pop())
      stack.push(token)
      continue
    }
    
    if (/[-+]/.test(token)) {
      while (/[-+*]/.test(stack.at(-1))) postfix.push(stack.pop())
      stack.push(token)
      continue
    }

    if (token === '(') {
      if (prevNum) return null // 1 (
      prevNum = false

      stack.push(token)
      continue
    }

    if (token === ')') {
      // prevNum = false

      while (stack.at(-1) !== '(') {
        postfix.push(stack.pop())
        if (!stack.length) return null
      }

      stack.pop() // убираем открывающую скобку
      continue
    }

    return null
  }
  if (!prevNum) return null

  while (stack.length) {
    if (stack.at(-1) === '(') return null
    postfix.push(stack.pop())
  }

  return postfix
}

const infix = input()
  .replace(/^-/, '0-')
  .replaceAll('(-', '(0-')
  .replaceAll('+', ' + ')
  .replaceAll('-', ' - ')
  .replaceAll('*', ' * ')
  .replaceAll('(', ' ( ')
  .replaceAll(')', ' ) ')
  .trim()
  .split(/\s+/)


console.log(infix)
const postfix = toPostfix(infix)
const ans = Array.isArray(postfix) ? evalPostfix(postfix) : 'WRONG'

/*
fs.writeFileSync('output.txt', `${ans}`)
*/
