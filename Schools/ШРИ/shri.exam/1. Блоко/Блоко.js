// module.exports = function layout(blocks) { /* ... */ }

function layout(blocks) {
  const n = blocks.length // количество блоков
  if (n === 0) return []
  let ids = blocks.map(i => i.id)
  const m = blocks[0].form[0].length // ширина блока

  blocks = blocks.reduce((r, i) => ({ ...r, [i.id]: i.form }), {})

  let j, prev;
  Object.entries(blocks).forEach(([id, rows]) => {
    const a = []
    const b = []
    const h = rows.length
    for (let i = 0; i < m; i++) {
      j = 0; while (rows[j]?.[i] === 0) j++
      a[i] = j
      j = h - 1; while (rows[j]?.[i] === 0) j--
      b[i] = h - 1 - j
    }
    blocks[id] = [a, b]
  })

  let result = []
  let c = Array(m).fill(0)
  for (let k = 0; k < n; k++) {
    let id
    for (id of ids) {
      const [a, b] = blocks[id]
      prev = c[0] + b[0]
      i = 1
      while (c[i] + b[i] === prev) i++
      if (i === m) {
        c = a
        result.push({
          "blockId": +id,
          "isRotated": false
        })

        ids = ids.filter(i => i !== id)
        found = true
        break
      }
      prev = c[0] + a[m - 1]

      i = 1
      while (c[i] + a[m - 1 - i] === prev) i++
      if (i === m) {
        c = b.reverse()
        result.push({
          "blockId": +id,
          "isRotated": true
        })
        ids = ids.filter(i => i !== id)
        break
      }
    }
  }
  return result.map((i, j) => ({ ...i, "position": j + 1 }))
}


// const blocks = [{
//   "id": 1,
//   "form": [
//     [1, 0, 1],
//     [1, 1, 1],
//     [1, 1, 1]
//   ]
// },
// {
//   "id": 2,
//   "form": [
//     [0, 0, 1],
//     [1, 1, 1],
//     [1, 1, 1],
//     [1, 1, 1],
//     [1, 1, 1]
//   ]
// },
// {
//   "id": 3,
//   "form": [
//     [0, 1, 1],
//     [1, 1, 1],
//     [0, 1, 0]
//   ]
// }];
// const blocks = [{
//   "id": 4892,
//   "form": [
//     [0, 0, 1],
//     [1, 0, 1],
//     [1, 1, 1],
//     [1, 1, 1],
//     [1, 1, 1],
//     [1, 1, 1],
//     [1, 1, 1],
//     [1, 1, 1]
//   ]
// },
// {
//   "id": 1839,
//   "form": [
//     [1, 1, 1],
//     [1, 1, 1],
//     [1, 1, 1],
//     [1, 1, 1],
//     [1, 0, 0]
//   ]
// },
// {
//   "id": 8183,
//   "form": [
//     [0, 1, 1],
//     [1, 1, 1],
//     [1, 1, 1],
//     [1, 1, 0],
//     [0, 1, 0]
//   ]
// }];

// const blocks = [{
//   "id": 939,
//   "form": [
//     [0, 1, 1, 0],
//     [0, 1, 1, 0],
//     [1, 1, 1, 1],
//     [0, 1, 0, 1]
//   ]
// },
// {
//   "id": 324,
//   "form": [
//     [0, 1, 1, 0],
//     [1, 1, 1, 1],
//     [0, 1, 1, 0]
//   ]
// },
// {
//   "id": 774,
//   "form": [
//     [1, 0, 1, 0],
//     [1, 1, 1, 1]
//   ]
// },
// {
//   "id": 839,
//   "form": [
//     [1, 1, 1, 1],
//     [1, 0, 0, 1]
//   ]
// },
// {
//   "id": 112,
//   "form": [
//     [1, 0, 0, 1],
//     [1, 1, 1, 1],
//     [1, 0, 0, 1],
//     [1, 0, 0, 1]
//   ]
// }]

const blocks = [{
  "id": 981437,
  "form": [
    [1, 0, 1, 0, 0],
    [1, 0, 1, 0, 1],
    [1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0]
  ]
},
{
  "id": 719362,
  "form": [
    [1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 0, 0, 1],
    [0, 1, 0, 0, 1]
  ]
},
{
  "id": 118442,
  "form": [
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1]
  ]
},
{
  "id": 782642,
  "form": [
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1]
  ]
},
{
  "id": 565173,
  "form": [
    [1, 1, 1, 1, 1],
    [0, 1, 0, 1, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0]
  ]
},
{
  "id": 728394,
  "form": [
    [1, 0, 1, 1, 0],
    [1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1]
  ]
  //   565173 true
  // 981437 true
  // 118442 false
  // 782642 false
  // 719362 true
  // 728394 true
}]
/*
565173 true
981437 true
118442 false
782642 false
719362 true
728394 true
*/

// [0, 1, 0, 1, 0],
// [1, 1, 1, 1, 1],
// [1, 0, 0, 0, 1]

// [1, 0, 1, 0, 1],
// [1, 1, 1, 1, 1],
// [0, 1, 0, 0, 1],
// [0, 1, 0, 0, 1]

// [1, 0, 1, 1, 0],
// [1, 0, 1, 1, 0],
// [1, 1, 1, 1, 1]
console.log(layout(blocks))

const result = [
  {
    "blockId": 738,
    "position": 1,
    "isRotated": false
  },
  {
    "blockId": 841,
    "position": 2,
    "isRotated": false
  }
];