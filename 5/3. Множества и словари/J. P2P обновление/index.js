const testcase = 31

const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/tests/${testcase}`, 'utf8').split('\n')


const start = Date.now()
// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').split('\n')
//*/

const [n, k] = input[0].split(' ').map(Number)

// вектора пиров с текущим набором чанков
const peers = Array.from({ length: n }, () => Array(k).fill(false))
peers[0] = Array(k).fill(true) // считаем что интернет и первый пир - у нас нулевой пир

// ценность каждого j-го пира для каждого i-го пира 
const valueables = Array.from({ length: n }, () => Array(n).fill(0))

// количество закачанных чанков
const chunks = Array(k).fill(0)

// сколько у каждого пира чанков. равно сумме true в векторе peers
const progress = [k, ...Array(n - 1).fill(0)]

let cnt = (n - 1) * k

let round = 0
let rounds = []

while (cnt) {
  // 1. определяем хотелки
  const wanted = []
  for (let i = 1; i < n; i++) {
    const peer = peers[i]
    for (let j = 0; j < k; j++) {
      // если у нас этого чанка нет и он реже предыдущих, то хотим его
      if (!peer[j] && (wanted[i] === undefined || chunks[j] < chunks[wanted[i]])) wanted[i] = j
    }
  }
  console.log(wanted)

  // 2. отправляем запросы
  // определяем, у какого пира взять желаемый чанк
  const requests = []
  for (let i = 1; i < n; i++) {
    const want = wanted[i]
    for (let j = 0; j < n; j++) {
      const peer = peers[j]
      // если у j-го пира есть желаемый чанк
      // и прогресс j-го пира меньше прогресса предыдущего выбранного
      if (peer[want] && (requests[i] === undefined || progress[j] < progress[requests[i]])) {
        requests[i] = j
      }
    }
  }

  // const r = {}
  // for (let i = 0; i < n; i++) {
  //   const j = r[requests[i]]
  //   if (!r[j]) r[j] = []
  //   r[j].push(i)
  // }

  // 3. выбираем, какие запросы удовлетворить
  const satisfy = Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    const valueable = valueables[i]

    for (let j = 1; j < n; j++) {
      if (requests[j] === i
        && (
          !satisfy[i]
          || valueable[j] > valueable[satisfy[i]]
          || valueable[j] === valueable[satisfy[i]] && (progress[j] < progress[satisfy[i]])
        )
      )
        satisfy[i] = j
    }
  }

  // 4. удовлетворяем запросы
  for (let i = 0; i < n; i++) {
    if (satisfy[i]) {
      const j = satisfy[i]
      peers[j][wanted[j]] = true
      chunks[wanted[j]]++
      valueables[j][i]++
      progress[j]++
      cnt--
    }
  }
  round++
  for (let i = 1; i < n; i++) {
    if (!rounds[i] && peers[i].indexOf(false) === -1) {
      rounds[i] = round
    }
  }
}

console.log(valueables)

const result = rounds.slice(1).join(' ')
console.log(result)
console.log(Date.now() - start)
/*
fs.writeFileSync('output.txt', result.toString())

*/
