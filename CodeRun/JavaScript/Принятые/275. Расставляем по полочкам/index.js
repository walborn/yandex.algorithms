const Good1 = { type: 'good', name: 'Смесь Friso Frisolaс Gold 2035', comments: [], related: [] };
const Good2 = { type: 'good', name: 'МакБук PRO 2035 13\' w/ clickbar', comments: [], related: [] };
const Good3 = { type: 'good', name: 'Фигурка Funko POP! Vinyl: Overwatch Уинстон', comments: [], related: [] };

// Отзывы в памяти
const Comment1 = { type: 'comment', text: 'Классный ноутбук!', comments: [], parent: null };
const Comment2 = { type: 'comment', text: 'Не понравился! Кликбар не работает совсем!', comments: [], parent: null };
const Comment3 = { type: 'comment', text: 'Хорошая цена, у малыша не было аллергии на неё', comments: [], parent: null };
const Comment4 = { type: 'comment', text: 'А вы уверены?', comments: [], parent: null };
const Comment5 = { type: 'comment', text: 'А у меня работает!', comments: [], parent: null };
const Comment6 = { type: 'comment', text: 'Яяяя', comments: [], parent: null };

// Похожие товары
Good3.related.push(Good1, Good2)
Good1.related.push(Good3)
Good2.related.push(Good3)

// Расставляем комментарии
Comment1.parent = Good2;
Good2.comments.push(Comment1);

Comment2.parent = Comment1;
Comment1.comments.push(Comment2);

Comment3.parent = Good1;
Good1.comments.push(Comment3);

// Comment4.parent = Comment3
// Comment3.comments.push(Comment4)

// Comment5.parent = Comment2
// Comment2.comments.push(Comment5)

// Comment6.parent = Good1
// Good1.comments.push(Comment6)

module.exports = function (data) {
  Array.prototype.sortBy = function (name) {
    return this.sort((a, b) => a[name] > b[name] ? 1 : a[name] < b[name] ? -1 : 0)
  }

  const getGood = (node) => node.parent ? getGood(node.parent) : node

  const getGoods = (node) => {
    const visited = new Set([node])
    const queue = [node]
    while (queue.length) {
      node = queue.shift()
      for (let rel of node.related) {
        if (visited.has(rel)) continue
        visited.add(rel)
        queue.push(rel)
      }
    }
    return [...visited]
  }

  const good = getGood(data)
  if (good.type !== 'good') return new Error() // или только отзывы
  const goods = getGoods(good).sortBy('name') // получаем все товары

  const goodsMd = []
  for (const { name, related } of goods)
    goodsMd.push(
      `- ${name}`,
      ...related
        .sortBy('name')
        .map(rel => `  * ${rel.name}`)
    )

  const renderComment = (level) => (comment) => [
    `${'  '.repeat(level)}- ${comment.text}`,
    ...comment.comments.sortBy('text').map(renderComment(level + 1)),
  ].join('\n')

  const comments = []
  for (const good of goods)
    comments.push(...good.comments.map(comment => ({ ...comment, text: `${comment.text} - про ${good.name}` })))

  const commentsMd = comments.sortBy('text').map(renderComment(0))

  return `## Отзывы\n\n${commentsMd.join('\n')}\n\n## Товары\n\n${goodsMd.join('\n')}`
}
// А ссылка осталась только на третий отзыв :-(


const answer = `## Отзывы

- Классный ноутбук! - про МакБук PRO 2035 13\' w/ clickbar
  - Не понравился! Кликбар не работает совсем!
- Хорошая цена, у малыша не было аллергии на неё - про Смесь Friso Frisolaс Gold 2035

## Товары

- МакБук PRO 2035 13' w/ clickbar
  * Фигурка Funko POP! Vinyl: Overwatch Уинстон
- Смесь Friso Frisolaс Gold 2035
  * Фигурка Funko POP! Vinyl: Overwatch Уинстон
- Фигурка Funko POP! Vinyl: Overwatch Уинстон
  * МакБук PRO 2035 13' w/ clickbar
  * Смесь Friso Frisolaс Gold 2035`

console.log(module.exports(Comment3) === answer)