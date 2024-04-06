const fs = require('fs')
const test = i => `${__dirname}/tests/` + i
const input = fs.readFileSync(test(12), 'utf8').split('\n')


// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').split('\n')
//*/

const n = +input.shift()
const p = input
  .map(i => i.split(' ').map(Number))
  .map(([x, y, z, t]) => (x > z || x === z && y > t) ? [z, t, x - z, y - t] : [x, y, z - x, t - y])

const a = p.slice(0, n)
const b = p.slice(n)

const shifts = {}

for (const [xi, yi, dxi, dyi] of a) {
  for (const [xj, yj, dxj, dyj] of b) {
    if (dxi === dxj && dyi === dyj) {
      const shift = ((xj - xi) << 16) + yj - yi
      shifts[shift] = (shifts[shift] || 0) + 1
    }
  }
}

let max = 0
for (let i in shifts) if (shifts[i] > max) max = shifts[i]

const result = n - max
console.log(result)
/*
fs.writeFileSync('output.txt', result.toString())

*/
