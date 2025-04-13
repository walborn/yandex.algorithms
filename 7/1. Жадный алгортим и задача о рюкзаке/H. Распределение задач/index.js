// почему-то выдает RE, пришлось переписать на python и там все тесты прошли
const fs = require('fs')
const test = 3
const input = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
// const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')


/*
Идея
1. превратим каждую строку в вид a, b, l
где а - кол-во S в нечетных, b - кол-во S в четных, l - длина строки

2. заметим, что добавление четной задачи не повлияет на решение,
то есть мы можем взять максимум, правда если у нас есть хотя бы одна нечетная

3. Значит нам нужно распределить нечетные. А тут просто - сортируем по разнице между a и b
И ставим сначала самую большую, затем самую маленькую и так далее

*/
// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').split('\n')

//*/

input.shift() // мы не будем использовать информацию о количестве строк

const odd = []
const even = []

for (let s of input) {
  const l = s.length
  let a = 0
  let b = 0
  
  for (let i = 0; i < l; i += 2) {
    if (s[i] === 'S') a++
    if (s[i + 1] === 'S') b++
  }
  if (l % 2) odd.push([a, b])
  else even.push([a, b])
}

let ans = 0
const r = odd.length
if (r) {
  ans = even.reduce((r, [a, b]) => r + Math.max(a, b), 0)
  odd.sort((a, b) => (b[0] - b[1]) - (a[0] - a[1]))
  const m = (r + 1) >> 1
  for (let i = 0; i < m; i++) ans += odd[i][0]
  for (let i = m; i < r; i++) ans += odd[i][1]
} else {
  ans = even.reduce((r, [a]) => r + a, 0)
}

console.log(ans)
/*
fs.writeFileSync('output.txt', `${ans}`)
*/
