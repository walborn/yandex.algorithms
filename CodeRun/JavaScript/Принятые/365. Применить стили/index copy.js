/*
Для каждого селектора делаем апдейт поддерева
*/
module.exports = function(html, css) {
  const getChildElements = (node) => node.children
    .filter(({ type }) => type === 'ELEMENT')

  const applyDeep = (node, declarations) => {
    node.styles = { ...node.styles, ...declarations }
    getChildElements(node).forEach(child => applyDeep(child, declarations))
  }
  const applyShallow = (node, declarations) => {
    node.styles = { ...node.styles, ...declarations }
  }

  const painter = (selector, declarations, node, apply) => {
    selector = selector.split(' ')
    const queue = [ { children: [ node ] } ]
    const tagA = selector.shift()
    const tagB = selector.pop()
    const rule = selector.pop()

    while (queue.length) {
      node = queue.shift()
      const children = getChildElements(node)
      for (let i = 0; i < children.length; i++) {
        const child = children[i]
        queue.push(...getChildElements({ children: [ child ] }))
        if (child.tag === tagA) {
          if (!tagB) apply(child, declarations) // нашли точное совпадение
          else if (!rule) painter(tagB, declarations, child, apply) // теперь просто найти tagB в поддереве
          else if (rule === '>') getChildElements(child) // точное совпадение среди непосредственных детей
            .filter(({ tag }) => tag === tagB)
            .forEach(gc => apply(gc, declarations))
          else if (rule === '~') children.slice(i + 1) // точное совпадение среди соседей снизу
            .filter(sibling => sibling.tag === tagB)
            .forEach(sibling => apply(sibling, declarations))
          else if (rule === '+') { // точное совпадение может быть только у первого соседа снизу
            const sibling = children[i + 1]
            if (sibling.tag === tagB) apply(sibling, declarations)
          }
        }
      }
    }
  }
  for (let { selector, declarations } of css) painter(selector, declarations, html, applyDeep)
  for (let { selector, declarations } of css) painter(selector, declarations, html, applyShallow)
  return html
}

// const tests = [{
//   css: [
//       {
//           'selector': 'parent',
//           'declarations': {
//               'color': 'rgb(0, 255, 0)',
//               'font-size': '15px'
//           }
//       },
//       {
//           'selector': 'tag',
//           'declarations': {
//               'color': 'rgb(0, 0, 255)'
//           }
//       }
//   ],
//   'html': {
//       type: 'ELEMENT',
//       tag:  'parent',
//       styles: {},
//       children: [
//           {
//               'type': 'TEXT',
//               'text': '\n    '
//           },
//           {
//               type: 'ELEMENT',
//               tag:  'tag',
//               styles: {},
//               children: [
//                   {
//                       'type': 'TEXT',
//                       'text': 'text'
//                   }
//               ]
//           },
//           {
//               'type': 'TEXT',
//               'text': '\n'
//           }
//       ]
//   },
//   result: {
//     type: 'ELEMENT',
//     tag:  'parent',
//     styles: {
//         'color': 'rgb(0, 255, 0)',
//         'font-size': '15px'
//     },
//     children: [
//         {
//             'type': 'TEXT',
//             'text': '\n    '
//         },
//         {
//             type: 'ELEMENT',
//             tag:  'tag',
//             styles: {
//                 'color': 'rgb(0, 0, 255)',
//                 'font-size': '15px'
//             },
//             children: [
//                 {
//                     'type': 'TEXT',
//                     'text': 'text'
//                 }
//             ]
//         },
//         {
//             'type': 'TEXT',
//             'text': '\n'
//         }
//     ]
//   },
// },
// {
//   css: [
//       {
//           'selector': 'parent',
//           'declarations': {
//               'color': 'rgb(0, 0, 0)',
//               'text-align': 'left',
//               'font-size': '16px'
//           }
//       },
//       {
//           'selector': 'tag',
//           'declarations': {
//               'color': 'rgb(0, 255, 0)',
//               'font-size': '13px'
//           }
//       },
//       {
//           'selector': 'tag2',
//           'declarations': {
//               'color': 'rgb(0, 0, 255)',
//               'text-align': 'right'
//           }
//       }
//   ],
//   html: {
//       type: 'ELEMENT',
//       tag:  'parent',
//       styles: {},
//       children: [
//           {
//               'type': 'TEXT',
//               'text': '\n    '
//           },
//           {
//               type: 'ELEMENT',
//               tag:  'tag',
//               styles: {},
//               children: [
//                   {
//                       'type': 'TEXT',
//                       'text': 'TEXT'
//                   }
//               ]
//           },
//           {
//               'type': 'TEXT',
//               'text': '\n    '
//           },
//           {
//               type: 'ELEMENT',
//               tag:  'tag2',
//               styles: {},
//               children: [
//                   {
//                       'type': 'TEXT',
//                       'text': 'TEXT'
//                   }
//               ]
//           },
//           {
//               'type': 'TEXT',
//               'text': '\n    '
//           },
//           {
//               type: 'ELEMENT',
//               tag:  'tag',
//               styles: {},
//               children: [
//                   {
//                       type: 'ELEMENT',
//                       tag:  'tag2',
//                       styles: {},
//                       children: [
//                           {
//                               'type': 'TEXT',
//                               'text': 'TEXT'
//                           }
//                       ]
//                   }
//               ]
//           },
//           {
//               'type': 'TEXT',
//               'text': '\n'
//           }
//       ]
//   },
//   result: {
//     type: 'ELEMENT',
//     tag:  'parent',
//     styles: {
//         'color': 'rgb(0, 0, 0)',
//         'text-align': 'left',
//         'font-size': '16px'
//     },
//     children: [
//         {
//             'type': 'TEXT',
//             'text': '\n    '
//         },
//         {
//             type: 'ELEMENT',
//             tag:  'tag',
//             styles: {
//                 'color': 'rgb(0, 255, 0)',
//                 'text-align': 'left',
//                 'font-size': '13px'
//             },
//             children: [
//                 {
//                     'type': 'TEXT',
//                     'text': 'TEXT'
//                 }
//             ]
//         },
//         {
//             'type': 'TEXT',
//             'text': '\n    '
//         },
//         {
//             type: 'ELEMENT',
//             tag:  'tag2',
//             styles: {
//                 'color': 'rgb(0, 0, 255)',
//                 'text-align': 'right',
//                 'font-size': '16px'
//             },
//             children: [
//                 {
//                     'type': 'TEXT',
//                     'text': 'TEXT'
//                 }
//             ]
//         },
//         {
//             'type': 'TEXT',
//             'text': '\n    '
//         },
//         {
//             type: 'ELEMENT',
//             tag:  'tag',
//             styles: {
//                 'color': 'rgb(0, 255, 0)',
//                 'text-align': 'left',
//                 'font-size': '13px'
//             },
//             children: [
//                 {
//                     type: 'ELEMENT',
//                     tag:  'tag2',
//                     styles: {
//                         'color': 'rgb(0, 0, 255)',
//                         'text-align': 'right',
//                         'font-size': '13px'
//                     },
//                     children: [
//                         {
//                             'type': 'TEXT',
//                             'text': 'TEXT'
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             'type': 'TEXT',
//             'text': '\n'
//         }
//     ]
//   }
// }]

const tests = [{
  css: [
    {
      selector: 'a',
      declarations: {
        'color': 'red'
      }
    },
    {
      selector: 'b ~ d',
      'declarations': {
        'color': 'green'
      }
    }
  ],
  html: {
    type: 'ELEMENT',
    tag:  'a',
    styles: {},
    children: [
      {
        type: 'ELEMENT',
        tag:  'b',
        styles: {},
        children: [
          {
            'type': 'TEXT',
            'text': 'text'
          }
        ]
      },
      {
        type: 'ELEMENT',
        tag:  'c',
        styles: {},
        children: [
          {
            'type': 'TEXT',
            'text': 'text'
          }
        ]
      },
      {
        type: 'ELEMENT',
        tag:  'd',
        styles: {},
        children: [
          {
            'type': 'TEXT',
            'text': 'text'
          }
        ]
      },
      {
        type: 'ELEMENT',
        tag:  'd',
        styles: { },
        children: [
          {
            'type': 'TEXT',
            'text': 'text'
          }
        ]
      },
    ]
  },
  result: {
    type: 'ELEMENT',
    tag: 'a',
    styles: { color: 'red'},
    children: [
      {
        type: 'ELEMENT',
        tag:  'b',
        styles: { color: 'red' },
        children: [
          {
            'type': 'TEXT',
            'text': 'text'
          }
        ]
      },
      {
        type: 'ELEMENT',
        tag:  'c',
        styles: { color: 'red' },
        children: [
          {
            'type': 'TEXT',
            'text': 'text'
          }
        ]
      },
      {
        type: 'ELEMENT',
        tag:  'd',
        styles: { color: 'green' },
        children: [
          {
            'type': 'TEXT',
            'text': 'text'
          }
        ]
      },
      {
        type: 'ELEMENT',
        tag:  'd',
        styles: { color: 'green' },
        children: [
          {
            'type': 'TEXT',
            'text': 'text'
          }
        ]
      },
    ]
  }
}]

for (const { css, html, result } of tests)
  console.log(JSON.stringify(module.exports(html, css)) === JSON.stringify(result))

// const a = JSON.stringify(module.exports(tests[0].html, tests[0].css))
// const b = JSON.stringify(tests[0].result)

// for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) {
//   console.log(a.slice(i))
//   console.log(b.slice(i))
//   break
// }
