const fs = require('fs')
const test = 1
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let input = []
rl.on('line', data => input.push(data))

rl.on('close', () => console.log(ans))

const [ n, ...p ] = input.map(Number)

const inf = 88888

let i = p.findIndex(x => x > 100)
if (i === -1) i = n
// dynamic programming 
let a = i === n
  ? [ p.reduce((r, x) => r + x, 0) ]
  : [ inf, p.slice(0, ++i).reduce((r, x) => r + x, 0) ]
let t = [ [], [] ] // количество использованных купонов

for (let index = i; index < n; index++) {
  let x = p[index]
  const b = []
  const c = []

  if (x > 100) {
    b[0] = a[1]
    c[0] = [...(t[1] || []), index ]

    for (let i = 1; i < a.length - 1; i++) {
      // если выгодней использовать купон
      if (a[i + 1] < a[i - 1] + x) c[i] =  [...(t[i + 1] || []), index ]
      // иначе у нас добавляется один купон, но использованных остается столько же
      else c[i] = t[i - 1]

      b[i] = Math.min(a[i + 1], a[i - 1] + x)
    }
    b[a.length - 1] = a[a.length - 2] + x
    b[a.length] = a[a.length - 1] + x
    c[a.length - 1] = t[a.length - 2]
    c[a.length] = t[a.length - 1]

  } else {
    for (let i = 0; i < a.length - 1; i++) {
      b[i] = Math.min(a[i + 1], a[i] + x)
      // если выгодней использовать купон
      if (a[i + 1] < a[i] + x) c[i] = [...(t[i + 1] || []), index ]
      // иначе у нас добавляется один купон, но использованных остается столько же
      else c[i] = t[i]
    }
    b[a.length - 1] = a[a.length - 1] + x
    c[a.length - 1] = t[a.length - 1]
  }
  a = b
  t = c
}


const min = Math.min(...a)
const rest = a.lastIndexOf(min)
const uses = t[rest]
const ans = [min, `${rest} ${uses.length}`, ...uses.map(i => i + 1)].join('\n')

console.log(ans)
*/