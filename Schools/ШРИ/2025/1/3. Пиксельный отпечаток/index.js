function solution({ type, name, age, skills, date }) {
  const rows = []
  const data = []

  const white = `<div style="display:inline-block; width:8px; height:8px; background-color:white;">0</div>`
  const black = (color) => `<div style="display:inline-block; width:8px; height:8px; background-color:${color};">1</div>`
  const squarish = (bin, color) => bin.split('').map(x => x === '0' ? white : black(color))


  const getChunks = (str, bytes, color) => {
    const bins = Array(bytes).fill('00000000')
    const n = Math.min(bytes, str.length)
    console.log(str, bytes, str.length)

    for (let i = 0; i < n; i++) bins[i] = str[i].charCodeAt(0).toString(2).padStart(8, '0')

    for (const i of bins) data.push(...i)
    for (const i of bins) rows.push(squarish(i, color))
  }

  getChunks(type, 32, '#70d6ff')
  getChunks(name, 16, '#ff70a6')
  getChunks(age, 2, '#ff0a54')
  getChunks(skills, 64, '#ff9770')
  getChunks(date, 10, '#bfd200')

  const checkSum = []
  for (let i = 0; i < 32; i++) {
    // let sum = ''
    // for (let j = 30; j > -1; j++) sum += data[j * 32 + i]
    checkSum.push(data[30 * 32 + i] % 2 ? white : black('black'))
  }

  const ans = []
  for (let i = 0; i < rows.length; i += 4) {
    ans.push(`<div>${rows.slice(i, i + 4).join('')}}</div>`)
  }
  ans.push(`<div>${checkSum.join('')}}</div>`)

  return `<div style="font-size:0">${ans.join('')}</div>`
}