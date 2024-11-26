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

const a = Number(input()) // красных маек
const b = Number(input()) // синих маек
const c = Number(input()) // красных пар носков
const d = Number(input()) // синих пар носков

/*
Идея

мы должны гарантированно достать оба цвета маек и одну пару носков
или один цвет маек и две пары носков

или синяя майка и синие носки
или красная майка и красные носки

нужно выбрать наименьшее
*/

let t, s

// красная майка и красные носки
if (a) { t = b + 1; s = d + 1 }
else { t = 1; s = c + 1 }

// синяя майка и синие носки
if (b) { if (a + 1 + c + 1 < t + s) { t = a + 1; s = c + 1  } }
else if (1 + (d + 1) < t + s) { t = 1; s = d + 1 }

// оба цвета маек
if (a && b && Math.max(a, b) + 1 + 1 < t + s) { t = Math.max(a, b) + 1; s = 1 }

// оба цвета носков
if (c && d && Math.max(c, d) + 1 + 1 < t + s) { t = 1; s = Math.max(c, d) + 1 }

console.log(t + s)

console.log(`${t} ${s}`)
/*
fs.writeFileSync('output.txt', `${t} ${s}`)
*/
