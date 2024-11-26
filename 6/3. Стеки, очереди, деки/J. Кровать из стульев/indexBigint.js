const fs = require('fs')
const test = 5
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/
const [ n, H ] = input().split(' ').map(BigInt)

const h = input().split(' ').map(BigInt)
let w = input().split(' ').map(BigInt)



class Deq {
  constructor() {
    this.values = []
  }
  append(x) {
    while (this.values.length && this.values.at(-1) < x) this.values.pop()
    this.values.push(x)
  }

  remove(x) {
    return x === this.values[0] && this.values.shift()
  }
}

const deq = new Deq()

const chairs = []

for (let i = 0; i < n; i++) chairs.push({ h: h[i], w: w[i] })
chairs.sort((a, b) => a.h > b.h ? 1 : a.h < b.h ? -1 : 0)

let ans = chairs.at(-1).h - chairs[0].h
let len = chairs[0].w

let i = -1
let j = 0

while (j < n) {
  while (++j < n && len < H ) {
    len += chairs[j].w
    deq.append(chairs[j].h - chairs[j - 1].h)
  }

  while (len >= H) {
    len -= chairs[++i].w
    if (len < H && ans > deq.values[0]) ans = deq.values[0]
    deq.remove(chairs[i + 1].h - chairs[i].h)
  }
}

console.log(ans)
console.log(+answer)
/*
fs.writeFileSync('output.txt', ans.toString())
*/


// let r = 0

// for (const { w } of hw) if (w >= H) return 0 


// for (let l = 0; l < n - 1; l++) {
//   while (++r < n && len < H) {
//     deq.append(hw[r].h - hw[r - 1].h)
//     len += hw[r].w
//   }
//   if (len >= H) ans = Math.min(ans, deq.values[0])
//   len -= hw[l].w
//   deq.remove(hw[l + 1].h - hw[l].h)
// }