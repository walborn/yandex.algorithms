const fs = require('fs')
const test = i => `${__dirname}/tests/` + i
const input = fs.readFileSync(test(2), "utf8").split('\n')

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').split('\n')
//*/
const dictionary = input[0].split(' ')
const dic = {}
for (const short of dictionary) {
  const len = short.length
  if (!dic[len]) dic[len] = new Set()
  dic[len].add(short)
}

const text = input[1].split(' ')


for (let i = 0; i < text.length; i++) {
  const word = text[i]
  for (let len = 1; len < word.length; len++) {
    if (!dic[len]) continue
    const candidate = word.slice(0, len)
    if (dic[len].has(candidate)) {
      text[i] = candidate
      break
    }
  }
}

const result = text.join(' ')
console.log(result)
/*
fs.writeFileSync('output.txt', result.toString())

*/

