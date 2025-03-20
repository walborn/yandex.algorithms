// Для построения двумерной пирамиды используются прямоугольные блоки, какой-то ширины и высоты
// Можно поставить один блок на другой только если ширина верхнего блока строго меньше ширины нижнего (блоки нельзя поворачивать)
// Самым нижним в пирамиде может быть блок любой ширины

// По заданному набору блоков определите максимальную высоту пирамиды, которую можно построить из данных блоков


const test = [
  { w: 2, h: 3 },
  { w: 1, h: 2 },
  { w: 4, h: 4 },
  { w: 4, h: 5 },
]

const myPyramid = (blocks) => {
  blocks.sort((a, b) => b.w - a.w || b.h - a.h)

  let w = Infinity
  let h = 0
  for (let block of blocks) {
    if (block.w === w) continue
    w = block.w
    h += block.h
  }

  return h
}

const buildPyramid = (blocks) => {
  let pyramid = {}
  for (let { w, h } of blocks) {
    pyramid[w] = Math.max(pyramid[w] || 0, h)
  }

  return Object.values(pyramid).reduce((a, b) => a + b, 0)
}

console.log(myPyramid(test))