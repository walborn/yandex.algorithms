module.exports = (n, width, height) => {
  const cols = Math.ceil(Math.sqrt(n))
  const rows = Math.ceil(n / cols)
  let dy = (cols - rows) / 2
  let dx = (cols - (n % cols)) / 2
  const frames = []

  for (let x = 0; x < (n % cols); x++) {
    frames.push({ x: (x + dx) * width / cols, y: dy * height / cols })
  }

  for (let y = +!!(n % cols); y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      frames.push({ x: x * width / cols, y: (y + dy) * height / cols })
    }
  }
  return frames.map(({ x, y }) => ({
    x: Math.round(x),
    y: Math.round(y),
    width: Math.round(width / cols),
    height: Math.round(height / cols),
  }))
}

// console.log(module.exports(1, 100, 100))
// console.log(module.exports(2, 1200, 900))
console.log(module.exports(3, 1200, 900))
const compare = (a, b) => {
  for (let i = 0; i < a.length; i++) {
    const l = a[i]
    const r = b[i]
    if (l.x !== r.x) return false
    if (l.y !== r.y) return false
    if (l.width !== r.width) return false
    if (l.height !== r.height) return false
  }
  return true
}
const test1 = [
  {
      "x": 0,
      "y": 0,
      "width": 100,
      "height": 100
  }
]
const test2 = [
  {
      "x": 0,
      "y": 225,
      "width": 600,
      "height": 450
  },
  {
      "x": 600,
      "y": 225,
      "width": 600,
      "height": 450
  }
]
const test3 = [
  {
    "x": 300,
    "y": 0,
    "width": 600,
    "height": 450
  },
  {
    "x": 0,
    "y": 450,
    "width": 600,
    "height": 450
  },
  {
    "x": 600,
    "y": 450,
    "width": 600,
    "height": 450
  }
]
console.log(compare(module.exports(1, 100, 100), test1))
console.log(compare(module.exports(2, 1200, 900), test2))
console.log(compare(module.exports(3, 1200, 900), test3))
