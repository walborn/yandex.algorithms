const fs = require('fs')
const test = i => `${__dirname}/tests/` + i
const input = fs.readFileSync(test(1), "utf8").split('\n')

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const input = fs.readFileSync("input.txt", "utf8").split('\n')
//*/
const [a, b] = input

const isAnagramma = (a, b) => {
  if (a.length !== b.length) return false
  const dic = {}
  for (let i = 0; i < a.length; i++) {
    dic[a[i]] = (dic[a[i]] || 0) + 1
    dic[b[i]] = (dic[b[i]] || 0) - 1
  }
  for (let i in dic) if (dic[i]) return false
  return true
}


const result = isAnagramma(a, b) ? 'YES' : 'NO'
console.log(result)

/*
fs.writeFileSync("output.txt", result)

*/

