const fs = require('fs')
const test = 1
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/

let n = Number(input())

// tribonacci
let first = 0
let second = 1
let third = 1


while (n--) {
  [first, second, third] = [second, third, first + second + third]  
}

/*
fs.writeFileSync('output.txt', `${third}`)
*/