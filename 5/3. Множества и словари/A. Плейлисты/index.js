const fs = require('fs')
const test = i => `${__dirname}/tests/` + i
const input = fs.readFileSync(test(2), "utf8").split('\n')

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const input = fs.readFileSync("input.txt", "utf8").split('\n')
//*/
const n = +input[0]
let common = new Set(input[2].split(' '))

for (let i = 4; i < 2 * n + 1; i += 2) {
  const tracks = input[i].split(' ')
  const intersection = new Set()
  for (const track of tracks) {
    if (common.has(track)) intersection.add(track)
  }
  console.log(tracks, intersection)
  common = intersection
}

const result = [common.size]
result.push([...common].sort().join(' '))

console.log(result.join('\n'))

/*//
fs.writeFileSync("output.txt", result.join('\n'))

*/

