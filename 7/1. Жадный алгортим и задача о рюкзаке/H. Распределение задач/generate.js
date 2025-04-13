const fs = require('fs')
const test = 1
const __input__ = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
// const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')

const input = ((i = 0) => () => __input__[i++])()

const generate = (n) => {
  const tasks = []
  for (let i = 0; i < n; i++) {
    const len = Math.ceil(Math.random() * 10)
    let task = ''
    for (let j = 0; j < len; j++) {
      task += 2 * Math.random() > 1 ? 'D' : 'S'
    }
    tasks.push(task)
  }
  return tasks
}


const perm = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
     }
   }
 }

 permute(inputArr)

 return result;
}

const solve = (tasks) => {
  const odd = []
  const even = []

  for (const s of tasks) {
    let l = s.length
    let a = 0
    let b = 0

    for (let i = 0; i < l; i+=2) {
      if (s[i] === 'S') a++
      if (s[i + 1] === 'S') b++
    }
    if (l % 2) odd.push([a, b])
    else even.push([a, b])
  }

  let ans = 0
  if (odd.length) {
    // есть хотя бы одна нечетная задача
    // 1. четные задачи дадут свой максимум, так как мы можем их расположить справа или слева
    ans = even.reduce((r, [a, b]) => r + Math.max(a, b), 0)
    // 2. сортируем нечетные задачи
    odd.sort((a, b) => (b[0] - b[1]) - (a[0] - a[1]))

    const m = (odd.length + 1) >> 1
    for (let i = 0; i < m; i++) ans += odd[i][0]
    for (let i = m; i < odd.length; i++) ans += odd[i][1]
  }
  else ans = even.reduce((r, [a, b]) => r + a, 0)
  return ans
}
const brutforce = (tasks) => {
  const permutations = perm(tasks)
  let max = 0
  for (const p of permutations) {
    const s = p.join('')
    let r = 0
    for (let i = 0; i < s.length; i+=2) {
      if (s[i] === 'S') r += 1
    }
    max = Math.max(max, r)
  }
  return max
}

for (let i = 0; i < 100; i++) {
  const tasks = generate(5)
  const a = solve(tasks)
  const b = brutforce(tasks)
  if (a !== b) {
    console.log(tasks)
    console.log(a, b)
  }
}