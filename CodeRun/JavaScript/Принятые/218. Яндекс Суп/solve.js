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
  
  for (let i = 0; i < input.length; i++) {
    if (/[A-Za-z]/.test(input[i])) letters.push([ i % width, (i / width) << 0 ])
  }
  if (!holes.length || !letters.length) return 1
  return 1 + Math.max(
    ...letters.map(([x, y]) => Math.min(
      ...holes.map(([a, b]) => Math.abs(a - x) + Math.abs(b - y)))))
}