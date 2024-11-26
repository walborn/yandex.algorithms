const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()


const a = +input().replace(/one/g, 1).replace(/zero/g, 0)
const b = +input().replace(/one/g, 1).replace(/zero/g, 0)

fs.writeFileSync('output.txt', a > b ? '>' : a < b ? '<' : '=')