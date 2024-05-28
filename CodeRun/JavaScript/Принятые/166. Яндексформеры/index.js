
module.exports = function (N, staff, K) {
  let sum = 0
  const countArr = Array(26).fill(0)
  for (let i of staff) countArr[i]++
  for (let i = 25; i; i--) {
    if (K < countArr[i]) return sum + i * K
    sum += i * countArr[i]
    K -= countArr[i]
  }
  return sum
}

const tests = [
  { input: { "N": 8, "staff": [5, 13, 8, 4, 4, 15, 1, 9], "K": 8 }, output: { "ans": 59 } },
  { input: { "N": 11, "staff": [14, 8, 15, 19, 2, 21, 13, 21, 12, 10, 8], "K": 5 }, output: { "ans": 90 } },
  { input: { "N": 15, "staff": [19, 20, 5, 10, 2, 20, 7, 9, 1, 3, 13, 14, 3, 3, 4], "K": 1 }, output: { "ans": 20 } },
  { input: { "N": 12, "staff": [22, 7, 24, 24, 11, 22, 24, 3, 9, 16, 2, 19], "K": 7 }, output: { "ans": 151 } },
  { input: { "N": 7, "staff": [10, 3, 21, 23, 6, 3, 8], "K": 4 }, output: { "ans": 62 } },
]

for (const test of tests) {
  const { N, staff, K } = test.input
  const { ans } = test.output
  console.log(module.exports(N, staff, K), ans)
}