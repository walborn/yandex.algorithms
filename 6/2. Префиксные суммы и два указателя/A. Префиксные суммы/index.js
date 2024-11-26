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
input()
const a = input().split(' ').map(Number)
const ans = a.reduce((r, i) => [ ...r, r.at(-1) + i ], [0]).slice(1).join(' ')

/*
fs.writeFileSync('output.txt', `${ans}`)
*/
