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

const a = Number(input()) // x[1]
const b = Number(input()) // y[1]
const c = Number(input()) // x[2]
const d = Number(input()) // y[2]

const x = Number(input())
const y = Number(input())

/*
    N 
  W + E
    S

d       ┬─────────┐
        │         │ 
b      ┴─────────┘
       a        c
*/

let ans = ''

if (y >= d) ans = 'N'
if (y <= b) ans = 'S'

// NW, W, SW
if (x <= a) ans += 'W'
// NE, E, SE
if (x >= c) ans += 'E'



/*
fs.writeFileSync('output.txt', `${ans}`)
*/
