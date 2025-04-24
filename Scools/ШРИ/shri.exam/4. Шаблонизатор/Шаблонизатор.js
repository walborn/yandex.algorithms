function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

function swap(parent, referenceNode, n) {
  let index = -1
  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i] === referenceNode) {
      index = i
      break
    }
  }
  if (index === -1) return

  const node = parent.children[(index + n) % parent.children.length]
  const tmp = referenceNode.nextSibling
  parent.insertBefore(referenceNode, node)
  parent.insertBefore(node, tmp)
}

function solution(node) {
  const copy = []
  const remove = []
  const removeChildren = []
  const switches = []

  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i]
    const make = child.getAttribute('x-make')
    if (!make) continue
    else if (make.startsWith('copy:')) copy.push(child)
    else if (make.startsWith('remove:')) remove.push(child)
    else if (make.startsWith('removeChildren:')) removeChildren.push(child)
    else if (make.startsWith('switch:')) switches.push(child)
  }

  copy.forEach(element => {
    const make = element.getAttribute('x-make')
    for (let i = 0; i < +make.slice(5); i++) {
      const clone = element.cloneNode(true)
      insertAfter(element, clone)
    }
  })

  remove.forEach(element => {
    const make = element.getAttribute('x-make')
    for (let i = 0; i < +make.slice(7); i++) {
      element.nextElementSibling?.remove()
    }
  })

  removeChildren.forEach(element => {
    const make = element.getAttribute('x-make')
    for (let i = 0; i < +make.slice(15); i++) {
      element.children[0].remove()
    }
  })

  switches.forEach(element => {
    const make = element.getAttribute('x-make')
    swap(node, element, +make.slice(7))
  })

  for (let i = 0; i < node.children.length; i++) {
    const element = node.children[i]
    element.removeAttribute('x-make')
    solution(element)
  }
}

solution(document.querySelector('entry'))

