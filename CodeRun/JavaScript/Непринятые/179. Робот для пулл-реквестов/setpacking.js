const setPacking = (sets) => {
  let unions = [[...sets]]

  for (let k = 0; k < sets.length; k++) {
    unions.push([])
    for (let i = 0; i < sets.length - 1; i++) {
      for (let j = 0; j < unions[k].length; j++) {
        const set = unions[k][j]
        if (new Set([...sets[i], ...set]).size !== sets[i].length + set.length) continue
        unions[k + 1].push([...sets[i], ...set])
      }
    }
    if (!unions[k+1].length) break
  }
  console.log(unions)
}

console.log(setPacking([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]])) // [1, 2, 3, 4]
// console.log(setPacking([[1, 2, 3], [1, 4], [2, 5]])) // [1, 2, 4, 5]