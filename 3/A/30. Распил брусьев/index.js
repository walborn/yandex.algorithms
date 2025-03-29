const minCost = (n, cuts) => {
  const l = [0, ...cuts.sort((i, j) => i - j), n]
  const k = l.length
  const a = Array.from({ length: k - 1}, () => Array(k).fill(0))

  for (let d = 2; d < k; d++)
    for (let i = 0; i < k - d; i++) {
      let minCost = Infinity
      const j = i + d
      for (let m = i + 1; m < j; m++) {
        const cost = a[i][m] + a[m][j]
        if (cost < minCost) minCost = cost
      }
      a[i][j] = l[j] - l[i] + minCost
    }
  return a[0][k - 1]
}

// var minCost = function (n, cuts) {
//   cuts = [0, ...cuts.sort((a, b) => a - b), n]

//   const k = cuts.length

//   const dp = [...Array(k - 1)].map(() => Array(k).fill(0))

//   for (let i = k - 3; i > -1; i--) {
//     for (let j = i + 2; j < k; j++) {
//       let minCost = Infinity
//       for (let m = i + 1; m < j; m++) {
//         const cost = dp[i][m] + dp[m][j]
//         if (cost < minCost) minCost = cost
//       }

//       dp[i][j] = cuts[j] - cuts[i] + minCost
//     }
//   }
//   return dp[0][k - 1]
// };

console.log(minCost(7, [1, 3, 4, 5]))
console.log(minCost(9, [5, 6, 1, 4, 2]))

/*
n, k = map(int, input().split())
l = [0] + list(map(int, input().split())) + [n]
k = len(l)

a = [[0]*k for _ in range(k - 1)]

for m in range(2, k):
  for i in range(k - m):
    L = l[i+m] - l[i]
    a[i][i+m] = inf
    for j in range(1, m):
      a[i][i+m] = min(a[i][i+m], a[i][i+j] + a[i+j][i+m])
    a[i][i + m] += L

print(a[0][k + 1])
*/