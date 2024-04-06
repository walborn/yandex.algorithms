const fs = require('fs')
const test = i => `${__dirname}/tests/` + i
const input = fs.readFileSync(test(1), "utf8").split('\n')

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').split('\n')
//*/
const [na, a, nb, b, nc, c] = input
const sa = new Set(a.split(' '))
const sb = new Set(b.split(' '))
const sc = new Set(c.split(' '))


const intersection = (a, b) => {
  const ab = new Set()
  for (const i of a) if (b.has(i)) ab.add(i)
  return ab
}


const result = [...new Set([...intersection(sa, sb), ...intersection(sa, sc), ...intersection(sb, sc)])].sort((x, y) => x - y).join(' ')
console.log(result)
/*
fs.writeFileSync('output.txt', result.toString())

*/

