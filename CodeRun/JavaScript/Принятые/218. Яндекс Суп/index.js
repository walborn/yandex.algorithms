const input =`
+----------------0---------------5
|                                |
|                                |
|          Y        D            |
|     A                          |
|              E                 |
|           N                    |
|  Y                             1
3        Y    D                  |
|         A              X       |
|                                |
+----------------2---------------+
`

// подсчитаем ширину кастрюли
module.exports = function (input) {
  input = input.trim()
  const width = input.indexOf('\n') + 1
  const height = (input.length + 1) / width
  const holes = []
  const letters = []
  for (let i = 1; i < width - 2; i++) if (/\d/.test(input[i])) holes.push([ i, 0 ])
  for (let i = 1; i < width - 2; i++) if (/\d/.test(input[width * (height - 1) + i])) holes.push([ i, height - 1 ])
  for (let i = 0; i < height; i++) if (/\d/.test(input[i * width])) holes.push([ 0, i ])
  for (let i = 1; i <= height; i++) if (/\d/.test(input[i * width - 2])) holes.push([ width - 2, i - 1 ])
  
  for (let x = 1; x < width - 2; x++)
    for (let y = 1; y < height - 1; y++)
      if (input[x + width * y] !== ' ') letters.push([ x, y ])

  return 1 + Math.max(
    ...letters.map(([x, y]) => Math.min(
      ...holes.map(([a, b]) => Math.abs(a - x) + Math.abs(b - y)))))
}

console.log(module.exports(input))