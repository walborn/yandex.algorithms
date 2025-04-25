interface TreeNode {
  // Имя узла
  name: string, 
  // Флаг, который показывает помечен ли текущий узел
  isMarked: boolean,
  // Дочерние узлы
  children: TreeNode[],
}

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const inputs: TreeNode[] = [
    {
        name: 'root',
        isMarked: false,
        children: [
            { 
                name: 'child1',
                isMarked: true,
                children: [],
            },
            {
                name: 'child2',
                isMarked: true,
                children: [],
            },
        ],
    },
    {
        name: 'root',
        isMarked: false,
        children: [
            { 
                name: 'child1',
                isMarked: true,
                children: [
                    { 
                        name: 'grandChild',
                        isMarked: false,
                        children: [],
                    }
                ],
            },
            { 
                name: 'child2',
                isMarked: false,
                children: [],
            }
        ],
    }
]

const answers = [
    {
        name: 'root',
        isMarked: true,
        children: [
            { 
                name: 'child1',
                isMarked: true,
                children: [],
            },
            {
                name: 'child2',
                isMarked: true,
                children: [],
            },
        ],
    },
    {
        name: 'root',
        isMarked: false,
        children: [
            { 
                name: 'child1',
                isMarked: true,
                children: [
                    { 
                        name: 'grandChild',
                        isMarked: true,
                        children: [],
                    }
                ],
            },
            { 
                name: 'child2',
                isMarked: false,
                children: [],
            }
        ],
    }
]


const module = {exports: (tree: TreeNode) => tree}

module.exports = function markTree(tree) {
  const dfs = (node) => {
    if (!node.children.length) return
    if (node.isMarked) {
      for (const child of node.children) child.isMarked = true
    }
    for (const child of node.children) dfs(child)
    
    if (!node.isMarked && node.children.every(i => i.isMarked)) node.isMarked = true
  } 

  dfs(tree)
  return tree
}

for (let i = 0; i < inputs.length; i++) {
  const output = module.exports(inputs[i])
  console.log(isEqual(output, answers[i]))
  if (!isEqual(output, answers[i])) {
    // console.log(inputs[i])
    console.log(output)
    // console.log(answers[i])
  }
}

