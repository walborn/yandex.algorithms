const fs = require('fs')
//*
const testcase = 1
const __input__ = fs.readFileSync(`${__dirname}/tests/${testcase}`, 'utf8').split('\n')
/*/
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
//*/

const input = ((i = 0) => () => __input__[i++])()

const [n, m] = input().split(' ').map(Number)
const white = Array.from({ length: +input() }, () => input().split(' ').map(Number))
const black = Array.from({ length: +input() }, () => input().split(' ').map(Number))

if (input() === 'white') {
    for (const [x, y] of white) {
        if ([x + 1, y + 1] in black && !([x + 2, y + 2] in black)) {
        }

        console.log(n, m, white, black)


// fs.writeFileSync('output.txt', a > b ? '>' : a < b ? '<' : '=')

