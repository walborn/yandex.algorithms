const fs = require('fs')
const testcase = 1
const __input__ = fs.readFileSync(`${__dirname}/tests/${testcase}`, 'utf8').split('\n')

const input = ((i = 0) => () => __input__[i++])()

const start = Date.now()
// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/

const [d, n] = input().split(' ').map(Number)


const players = Array.from({ length: n }, () => input().split(' ').map(Number))

const eps = 0.000001
const pointincircle = (x, y, u, v, r) => (x - u) ** 2 + (y - v) ** 2 < r ** 2 + eps
/*
y

yr       ┬─────────┐
         │         │ 
yl       ┴─────────┘

0        xl         xr     x
*/

const checkrect = (xl, yl, xr, yr, time) => {
  // Если лежит за пределами большого полукруга,
  // то выкидываем этот прямоугольник
  if (!pointincircle(0, 0, xl, yl, d)
    && !pointincircle(0, 0, xl, yr, d)
    && !pointincircle(0, 0, xr, yl, d)
    && !pointincircle(0, 0, xr, yr, d)
  ) return [false, 0, 0]

  // Если прямоугольник слишком маленкий, и не лежит внутри одного круга,
  // то считаем, что нашли точку
  if (xr - xl < eps)
    return [true, (xl + xr) / 2, (yl + yr) / 2]

  // Для каждого игрока проверим, не лежит ли прямоугольник внутри его круга
  for (const [x, y, v] of players) {
    if (pointincircle(x, y, xl, yl, v * time)
      && pointincircle(x, y, xl, yr, v * time)
      && pointincircle(x, y, xr, yl, v * time)
      && pointincircle(x, y, xr, yr, v * time)
    ) return [false, 0, 0]
  }

  const xm = (xl + xr) / 2
  const ym = (yl + yr) / 2

  let quarter
  if ((quarter = checkrect(xl, yl, xm, ym, time))[0]) return quarter
  if ((quarter = checkrect(xl, ym, xm, yr, time))[0]) return quarter
  if ((quarter = checkrect(xm, yl, xr, ym, time))[0]) return quarter
  if ((quarter = checkrect(xm, ym, xr, yr, time))[0]) return quarter


  // const xs = [xl, (xl + xr) / 2, xr]
  // const ys = [yl, (yl + yr) / 2, yr]

  // for (let i = 0; i < 2; i++) {
  //   for (let j = 0; j < 2; j++) {
  //     const quarter = checkrect(xs[i], ys[j], xs[i + 1], ys[j + 1], time)
  //     if (quarter[0]) return quarter
  //   }
  // }
  return [false, 0, 0]
}
const check = (time) => checkrect(-d, 0, d, d, time)

let l = 0
let r = 4 * d

while (r - l > eps) {
  const m = (l + r) / 2
  if (check(m)[0]) l = m
  else r = m
}

console.log(l)
console.log(check(l))

console.log(Date.now() - start)

const [x, y] = check(l).slice(1)
/*
fs.writeFileSync('output.txt', `${l}\n${x}\n${y}`)

*/


// const answer = fs.readFileSync(`${ __dirname } / tests / answers / ${ testcase }.a`, 'utf8').split('\n').map(Number)

// for (let i = 0; i < result.length; ++i) {
//   if (result[i] !== answer[i]) {
//     console.log(i, result[i], answer[i])
//   }
// }
