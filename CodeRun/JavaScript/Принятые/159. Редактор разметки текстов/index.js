module.exports = (str) => {
  str = str
    // - Формат ссылки (Две открывающие скобки, адрес ссылки, первый пробел, текст ссылки с любым кол-вом пробелов, две закрывающие скобки)
    .replace(/\(\(([^ ]+) (.+)\)\)/g, '<a href="$1">$2</a>')
    // - Одинарные кавычки в тесте приводятся к двойным;
    .replace("'", '"')
  
  // - Незначимые пробелы и переносы строк на выходе не имеют значения, т.к. в тестах html приводится к одной строке, а лишние пробелы удаляются;
  const lines = str.split('\n').map(line => line.trim())

  const html = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    // - Формат заголовка (Начало строки, знак равно, пробел, текст заголовка, конец строки);
    if (line.startsWith('= ')) html.push(`<h1>${line.slice(2)}</h1>`)
    // - Формат списка (Пункт списка, повторенный один и более раз: Начало строки, звёздочка, пробел, текст, конец строки. До и после списка пустые строки);
    else if (line.startsWith('* ') && lines[i-1] === '') {
      html.push('<ul>')
      while (lines[i]?.startsWith('* '))
        html.push(`<li>${lines[i++].slice(2)}</li>`)
      html.push('</ul>')
    }
    else if (line) {
      // - Формат абзаца (Начало строки, текст абзаца, конец строки);
      html.push(`<p>${line}</p>`)
    }
    i++
  }
  return html.join('')
}

const test5 = `
= head

text ((https://ya.ru link)) text.

* item
* item`
console.log(module.exports(test5))