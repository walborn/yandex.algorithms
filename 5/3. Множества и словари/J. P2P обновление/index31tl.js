const testcase = 1

const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/tests/${testcase}`, 'utf8').split('\n')

const start = Date.now()
// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').split('\n')
//*/

const [n, k] = input[0].split(' ').map(Number)

const peers = Array.from({ length: n }, () => Array(k).fill(undefined))
peers[0] = Array(k).fill(0) // считаем что интернет и первый пир - у нас нулевой пир
const valueables = Array.from({ length: n }, () => Array(n).fill(0))

const chunks = Array(k).fill(0) // добавили нулевой чанк, кторый считаем, что есть у всех
const progress = Array(n).fill(0)
progress[0] = k
let cnt = (n - 1) * k

let round = 0
let rounds = []

while (cnt) {
  // 1. определяем хотелки
  const wanted = []
  for (let i = 1; i < n; i++) { // на первом пире уже все есть
    const peer = peers[i]
    for (let j = 0; j < k; j++) {
      // если у нас нет j-го чанка 
      if (peer[j] !== undefined) continue
      // и он реже других, то хотим его
      if (wanted[i] === undefined || chunks[j] < chunks[wanted[i]]) wanted[i] = j
    }
  }

  // 2. отправляем запросы
  const requests = []
  for (let i = 1; i < n; i++) {
    const want = wanted[i]

    for (let j = 0; j < n; j++) {
      if (peers[j][want] !== undefined && (requests[i] === undefined || progress[j] < progress[requests[i]])) {
        requests[i] = j
      }
    }
  }

  console.log(requests)

  const satisfy = Array(n).fill(0)
  // 3. выбираем, какие запросы удовлетворить
  for (let i = 0; i < n; i++) {
    const valueable = valueables[i]
    for (let j = 1; j < n; j++) {
      if (requests[j] !== i) continue
      if (satisfy[i] === 0) { satisfy[i] = j; continue }
      if (valueable[j] < valueable[satisfy[i]]) continue
      if (valueable[j] === valueable[satisfy[i]] && progress[j] >= progress[satisfy[i]]) continue
      satisfy[i] = j
    }
  }

  // 4. удовлетворяем запросы

  for (let i = 0; i < n; i++) {
    if (satisfy[i] === 0) continue
    const j = satisfy[i]
    peers[j][wanted[j]] = i
    progress[j]++
    chunks[wanted[j]]++
    valueables[j][i]++
    cnt--
  }
  round++
  for (let i = 1; i < n; i++) {
    if (rounds[i]) continue
    if ((peers[i].length === k) && peers[i].indexOf(undefined) === -1) {
      rounds[i] = round
    }
  }
}

const result = rounds.slice(1).join(' ')
console.log(result)

fs.writeFileSync('output.txt', result.toString())
