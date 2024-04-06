module.exports = function (field, moves) {
  let map = field.map(i => [...i].map(j => ['Y', 'A', 'N', 'D', 'E', 'X'].includes(j)))
  let x = 2, y = 0, l = 3, i = 0

  if (!moves.length) return [[y, x], l]
  moves = moves.split(' ')

  while (i < moves.length) {
    const d = moves[i++]
    let n = +moves[i++]
    if (Number.isNaN(n)) throw new Error()
    if (d === 'R') {
      while (n--) if (map[y][++x]) { ++l; map[y][x] = false }
    } else if (d === 'L') {
      while (n--) if (map[y][--x]) { ++l; map[y][x] = false }
    } else if (d === 'D') {
      while (n--) if (map[++y][x]) { ++l; map[y][x] = false }
    } else if (d === 'U') {
      while (n--) if (map[--y][x]) { ++l; map[y][x] = false }
    }
  }
  return [[y, x], l]
}

let field = [
  "ooo------Y--AND------",
  "-----EXY--A--N---D--E",
  "-X-----Y--A-N---D----",
  "------EXY----A---N---",
  "--DE--X---------YA---",
  "-----ND---EXY--AN--D-",
  "----E-----X-Y----A--N",
  "D-----E-XY---AN---D--",
  "E--------------------",
  "-------X---Y------A-N",
  "----D-EX----------YA-",
  "--N-DEX--Y-A--N-----D",
  "E------X--Y----------",
]

let moves = 'R 12 D 2 R 2 U 1 R 2'
console.log(module.exports(field, ''))