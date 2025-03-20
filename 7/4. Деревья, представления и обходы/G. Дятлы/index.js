const fs = require('fs')
const test = 4
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/



const [ n, m, k ] = input().split(' ').map(Number)

const factorial = [1, 1]
for (let i = 2; i < n + 1; i++) factorial[i] = factorial[i - 1] * i % k
const g = Array.from({ length: n }, () => [])

for (let i = 0; i < m; i++) {
  const [ u, v ] = input().split(' ').map(i => Number(i) - 1)
  g[u].push(v)
  g[v].push(u)
}

const solve = () => {
  // если убрать эту проверку, то она не скажется на асимптотике
  // if (m > n - 1) return 0 // есть цикл

  // расселить дятлов мы можем, если это дерево или лес (т.е. нет циклов)
  
  // у каждого узла, кроме корня, может быть не больше одного большого поддерева (глубины >= 2)
  // у корня их два


  // количество перестановок маленьких поддеревьев (если их x) = x!

  // позицию можно отразить зеркально относительно
  // - горизонтали (зеркальное отражение)
  // - вертикали (корень расположить либо на левом, либо на правом дереве)
  
  let ans = 1

  // 1. Считаем одиночек
  let lonely = g.filter(i => !i.length).length

  // Одиноких дятлов можно расположить между любыми двумя
  // другими дятлами или в самом низу или вверху
  // Поскольку всего дупел n - lonely, значит точек для расположения будет
  // (n - lonely + 2) * (n - lonely + 1) *...* (n - 1 + 2)
  // ans = ans * (n + 1)! / (n + 1 - lonely)!
  for (let i = 0; i < lonely; i++) ans = (ans * (1 + n - i)) % k

  // 2. Причесываем ежиков
  // Считаем, сколько у каждого узла листьев и убираем их
  const w = Array(n).fill(0)
  for (let i = 0; i < n; i++) if (g[i].length === 1 && !w[i]) {
    w[j = g[i].pop()]++
    g[j].splice(g[j].indexOf(i), 1)
  }

  let chains = 0

  // 2. Обрабатываем единичных ежиков
  for (let i = 0; i < n; i++) {
    // если ежик один, то умножаем на факториал его веса
    if (g[i].length === 0 && w[i]) {
      chains++
      ans = (ans * factorial[w[i]] * 2) % k
    }
  }

  // 3. Обрабатываем цепочки ежиков
  for (let i = 0; i < n; i++) {
    // одиночек и ежиков уже обработали
    if (g[i].length === 0) continue
    // ищем только краевые узлы, чтоб удобней было считать
    if (g[i].length === 2) continue
    // если больше трех поддеревьев, то выходим
    if (g[i].length > 2) return 0

    chains++
    // у нас будут только деревья вида и i будет указывать на один из концов
    // (3) - (1) - (7) - (0) - (3) - ... - (2)
    // проходимся по вырожденному дереву и умножаем на факториалы его весов
    
    // Попутно удаляем ребра, чтоб не мешали
    // едим рыбу с головы или хвоста
    let j = i
    ans = (ans * factorial[w[j]]) % k
    while (g[j].length === 1) {
      g[g[j]].splice(g[g[j]].indexOf(j), 1)
      ans = (ans * factorial[w[j = g[j].pop()]]) % k
    }
    // если вышли из-за того, что было раздвоение ветки
    if (g[j].length) return 0

    // отражение относительно вертикали (поменять деревья местами)
    ans = (ans * 2) % k
    // отражение относительно горизонтали, если есть больше одного ребенка
    ans = (ans * 2) % k
  }

  // мы могли не съесть круглые графы
  for (const i of g) if (i.length) return 0

  // Деревья леса пересекаться не могут, но их относительное расположение будет chains!
  ans = (ans * factorial[chains]) % k

  return ans 
}

console.log(solve())
/*
fs.writeFileSync('output.txt', `${solve()}`)
*/
