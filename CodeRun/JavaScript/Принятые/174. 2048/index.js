module.exports = function solution(field, moves) {
  const swipe = (row) => {
    let i = 0, prv = null
    for (let nxt of row) {
      if (!nxt) continue
      if (nxt === prv) { row[i++] *= 2; prv = null }
      else { if (prv) i++; row[i] = prv = nxt }
    }
    if (!prv) i--
    while (++i < row.length) row[i] = 0
    return row
  }
  const swipes = {
    L: () => { for (let row of field) swipe(row) },
    R: () => { for (let row of field) swipe(row.reverse()).reverse() },
    U: () => { for (let i = 0; i < 4; i++) {
      row = swipe(Array.from({ length: 4 }, (_, j) => field[j][i]))
      for (let j = 0; j < 4; j++) field[j][i] = row[j]
    }},
    D: () => { for (let i = 0; i < 4; i++) {
      row = swipe(Array.from({ length: 4 }, (_, j) => field[3 - j][i]))
      for (let j = 0; j < 4; j++) field[j][i] = row[3 - j]
    }},
  } 
  for (let move of moves.split(' ')) swipes[move]()
  return field
}

const field = [
  [0, 2, 4, 8],
  [0, 0, 0, 0],
  [0, 2, 2, 8],
  [0, 2, 2, 2],
];

const moves = "U U U"; //"U U U";

console.log(module.exports(field, moves))