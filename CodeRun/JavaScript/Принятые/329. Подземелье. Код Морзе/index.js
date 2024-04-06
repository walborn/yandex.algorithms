
module.exports = function(input) {
  const reverse = (a)  => [ ...a ].reverse()
  const shrink = (a) => {
    let b = []
    for (let i = 0; i < a.length; i+=2) b.push(a[i])
    return b
  }
  const toNumber = (a) => {
    let index
    if (a[0] === '.') {
      index = a.indexOf('-')
      return ~index ? index : 5
    }
    index = a.indexOf('.') 
    return 5 + (~index ? index : -5)
  }
  return input.split('   ')
    .map(i => i.split(' ')
      .map(i => {
        if (i[0] === 'T') return reverse(i.slice(1))
        if (i[0] === 'R') return shrink(i.slice(1))
        return [...i]
      }))
      .map(i => i.map(toNumber).join('')).join(' ')
};

const input = '----- T----- -.... .----   .---- R........-- T..... T.----   R.......... .---- T..... ---..   .---- R----...... R----...... ...--'

console.log(module.exports(input))
// 5261 1459 5158 1773