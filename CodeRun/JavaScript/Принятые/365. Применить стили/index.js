/*
Для каждого селектора делаем апдейт поддерева
*/
module.exports = function(html, css) {
  // добавляем next, чтоб потом было легко искать селекторы
  const nextifyApply = () => {
    const queue = [ html ]
    while (queue.length) {
      const node = queue.pop()
      const children = node.children.filter(child => child.type === 'ELEMENT')
      for (let i = 1; i < children.length; i++) children[i - 1].next = children[i]
      queue.push(...children)
    }
  }
  // убираем все next, чтоб не портить код
  const nextifyReset = () => {
    const queue = [ html ]
    while (queue.length) {
      const node = queue.pop()
      const children = node.children.filter(child => child.type === 'ELEMENT')
      for (let i = 1; i < children.length; i++) delete children[i - 1].next
      queue.push(...children)
    }
  }

  // Применяем стили к ноде и всем её детям
  const apply = (node, declaration) => {
    node.styles = { ...node.styles, ...declaration }
    for (const child of node.children.filter(i => i.type === 'ELEMENT')) apply(child, declaration)
  }

  // // ищем все селекторы 
  // const paint = (tag, declaration, node = html) => {
  //   const queue = [ node ]
  //   while (queue.length) {
  //     node = queue.shift()
  //     if (node.tag === tag) apply(node, declaration)
  //     else queue.push(...node.children?.filter(i => i.type === 'ELEMENT'))
  //   }

  //   return html
  // }

  const paintify = (selector, declaration, node) => {
    selector = selector.split(' ')
    const parent = selector.shift()
    const child = selector.pop()
    const rule = selector.pop()

    const queue = [ node ]
    while (queue.length) {
      node = queue.shift()
      queue.push(...node.children?.filter(i => i.type === 'ELEMENT'))
      if (node.tag !== parent) continue
      if (!child) apply(node, declaration)
      else if (!role) paintify(child, declaration, node)
      else if (rule === '>') node.children.filter(i => i.tag === child).forEach(childTag => paintify(childTag, declaration, node))
      else if (rule === '+') if (node.next.tag === child) apply(node.next, declaration)
      else if (role === '~') while (node = node.next) if (node.tag === child) apply(node, declaration)
    }

    return html
  }

  nextifyApply()
  for (const { selector, declaration } of css) paintify(selector, declaration, html)
  nextifyReset()
  return html
}

const tests = [{
  "css": [
      {
          "selector": "parent",
          "declarations": {
              "color": "rgb(0, 255, 0)",
              "font-size": "15px"
          }
      },
      {
          "selector": "tag",
          "declarations": {
              "color": "rgb(0, 0, 255)"
          }
      }
  ],
  "html": {
      "type": "ELEMENT",
      "tag": "parent",
      "styles": {},
      "children": [
          {
              "type": "TEXT",
              "text": "\n    "
          },
          {
              "type": "ELEMENT",
              "tag": "tag",
              "styles": {},
              "children": [
                  {
                      "type": "TEXT",
                      "text": "text"
                  }
              ]
          },
          {
              "type": "TEXT",
              "text": "\n"
          }
      ]
  },
  result: {
    "type": "ELEMENT",
    "tag": "parent",
    "styles": {
        "color": "rgb(0, 255, 0)",
        "font-size": "15px"
    },
    "children": [
        {
            "type": "TEXT",
            "text": "\n    "
        },
        {
            "type": "ELEMENT",
            "tag": "tag",
            "styles": {
                "color": "rgb(0, 0, 255)",
                "font-size": "15px"
            },
            "children": [
                {
                    "type": "TEXT",
                    "text": "text"
                }
            ]
        },
        {
            "type": "TEXT",
            "text": "\n"
        }
    ]
  },
},
{
  css: [
      {
          "selector": "parent",
          "declarations": {
              "color": "rgb(0, 0, 0)",
              "text-align": "left",
              "font-size": "16px"
          }
      },
      {
          "selector": "tag",
          "declarations": {
              "color": "rgb(0, 255, 0)",
              "font-size": "13px"
          }
      },
      {
          "selector": "tag2",
          "declarations": {
              "color": "rgb(0, 0, 255)",
              "text-align": "right"
          }
      }
  ],
  html: {
      "type": "ELEMENT",
      "tag": "parent",
      "styles": {},
      "children": [
          {
              "type": "TEXT",
              "text": "\n    "
          },
          {
              "type": "ELEMENT",
              "tag": "tag",
              "styles": {},
              "children": [
                  {
                      "type": "TEXT",
                      "text": "TEXT"
                  }
              ]
          },
          {
              "type": "TEXT",
              "text": "\n    "
          },
          {
              "type": "ELEMENT",
              "tag": "tag2",
              "styles": {},
              "children": [
                  {
                      "type": "TEXT",
                      "text": "TEXT"
                  }
              ]
          },
          {
              "type": "TEXT",
              "text": "\n    "
          },
          {
              "type": "ELEMENT",
              "tag": "tag",
              "styles": {},
              "children": [
                  {
                      "type": "ELEMENT",
                      "tag": "tag2",
                      "styles": {},
                      "children": [
                          {
                              "type": "TEXT",
                              "text": "TEXT"
                          }
                      ]
                  }
              ]
          },
          {
              "type": "TEXT",
              "text": "\n"
          }
      ]
  },
  result: {
    "type": "ELEMENT",
    "tag": "parent",
    "styles": {
        "color": "rgb(0, 0, 0)",
        "text-align": "left",
        "font-size": "16px"
    },
    "children": [
        {
            "type": "TEXT",
            "text": "\n    "
        },
        {
            "type": "ELEMENT",
            "tag": "tag",
            "styles": {
                "color": "rgb(0, 255, 0)",
                "text-align": "left",
                "font-size": "13px"
            },
            "children": [
                {
                    "type": "TEXT",
                    "text": "TEXT"
                }
            ]
        },
        {
            "type": "TEXT",
            "text": "\n    "
        },
        {
            "type": "ELEMENT",
            "tag": "tag2",
            "styles": {
                "color": "rgb(0, 0, 255)",
                "text-align": "right",
                "font-size": "16px"
            },
            "children": [
                {
                    "type": "TEXT",
                    "text": "TEXT"
                }
            ]
        },
        {
            "type": "TEXT",
            "text": "\n    "
        },
        {
            "type": "ELEMENT",
            "tag": "tag",
            "styles": {
                "color": "rgb(0, 255, 0)",
                "text-align": "left",
                "font-size": "13px"
            },
            "children": [
                {
                    "type": "ELEMENT",
                    "tag": "tag2",
                    "styles": {
                        "color": "rgb(0, 0, 255)",
                        "text-align": "right",
                        "font-size": "13px"
                    },
                    "children": [
                        {
                            "type": "TEXT",
                            "text": "TEXT"
                        }
                    ]
                }
            ]
        },
        {
            "type": "TEXT",
            "text": "\n"
        }
    ]
  }
}]

// for (const { css, html, result } of tests)
//   console.log(JSON.stringify(module.exports(html, css)) === JSON.stringify(result))

console.log(JSON.stringify(module.exports(tests[0].html, tests[0].css)))
console.log(JSON.stringify(tests[0].result))