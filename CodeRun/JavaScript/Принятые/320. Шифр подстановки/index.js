function decode(message, replaces) {
  let decoded = '', i = 0
  replaces = replaces.reverse()
  while (i < message.length) {
    const { from, to } = replaces.find(({ from }) => message.slice(i).startsWith(from)) || { from: message[i], to: message[i]}
    console.log(from, to)
    decoded += to
    i += from.length
  }
  return decoded
 }
 
 module.exports = { decode }


 console.log(decode("Aa", [])) // Aa
 console.log(decode("Aa", [{ "from": "a", "to": "b" }])) // Ab
 console.log(decode("ab", [{ "from": "a", "to": "b" }])) // bb
 console.log(decode("ab", [{ "from": "a", "to": "ba" }, { "from": "b", "to": "r" }])) // bar
 console.log(decode("ab", [{ "from": "b", "to": "bar" }, { "from": "ab", "to": "foo" }])) // foo
 console.log(decode("ab", [{ "from": "a", "to": "bar" }, { "from": "ab", "to": "foo" }])) // foo