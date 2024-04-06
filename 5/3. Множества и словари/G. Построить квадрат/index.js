const fs = require('fs')
const test = i => `${__dirname}/tests/` + i
const input = fs.readFileSync(test(9), 'utf8').split('\n')

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').split('\n')
//*/

const hash = (a, b) => (BigInt(a) << 32n) ^ BigInt(b)

const needForSquare = (x, y, n) => {
  let result, xi, yi, xj, yj, xk, yk, xl, yl, dx, dy, triple

  for (let i = 0; i < n - 1; i++) {
    xi = x[i]
    yi = y[i]
    for (let j = i + 1; j < n; j++) {
      xj = x[j]
      yj = y[j]

      dx = xj - xi
      dy = yj - yi

      xk = xi + dy
      yk = yi - dx

      if (xk >= xi && s.has(hash(yk, xk))) {
        xl = xj + dy
        yl = yj - dx
        triple = i
        result = `1\n${xl} ${yl}`
        break
      }

      xk = xi - dy
      yk = yi + dx

      if (xk >= xi && s.has(hash(yk, xk))) {
        xl = xj - dy
        yl = yj + dx
        triple = i
        result = `1\n${xl} ${yl}`
        break
      }
      xk = xj + dy
      yk = yj - dx

      if (xk >= xi && s.has(hash(yk, xk))) {
        xl = xi + dy
        yl = yi - dx
        triple = i
        result = `1\n${xl} ${yl}`
        break
      }

      xk = xj - dy
      yk = yj + dx

      if (xk >= xi && s.has(hash(yk, xk))) {
        xl = xi - dy
        yl = yi + dx
        triple = i
        result = `1\n${xl} ${yl}`
        break
      }
    }

    if (typeof triple !== 'undefined') break
  }

  if (typeof triple !== 'undefined') {
    for (let i = triple; i < n - 1; i++) {
      xi = x[i]
      yi = y[i]
      for (let j = i + 1; j < n; j++) {
        xj = x[j]
        yj = y[j]

        dx = xj - xi
        dy = yj - yi

        xk = xi + dy
        yk = yi - dx
        xl = xj + dy
        yl = yj - dx

        if (s.has(hash(yk, xk)) && s.has(hash(yl, xl))) return '0'
      }
    }
  }

  if (result) return result

  if (x.length === 1) {
    xi = x[0]
    yi = y[0]
    xj = xi + 1
    yj = yi
    xk = xi + 1
    yk = yi + 1
    xl = xi
    yl = yi + 1

    return `3\n${xj} ${yj}\n${xk} ${yk}\n${xl} ${yl}`
  }

  xi = x[0]
  yi = y[0]
  xj = x[1]
  yj = y[1]

  dx = xj - xi
  dy = yj - yi

  xk = xj - dy
  yk = yj + dx
  xl = xi - dy
  yl = yi + dx

  return `2\n${xk} ${yk}\n${xl} ${yl}`
}
const start = Date.now()
const n = +input.shift()
const x = new Array(n)
const y = new Array(n)

const s = new Set()

const r = input.slice(0, n).map(i => i.split(' ').map(Number))

r.sort((a, b) => a[0] - b[0])

for (let i = 0; i < n; i++) {
  x[i] = r[i][0]
  y[i] = r[i][1]
  s.add(hash(y[i], x[i]))
}

const result = needForSquare(x, y, n)
console.log(Date.now() - start)
console.log(4, result)

/*
fs.writeFileSync('output.txt', result.toString())

*/
