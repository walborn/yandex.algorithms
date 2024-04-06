module.exports = function (prs) {
  prs.sort((a, b) => a.created - b.created)

  const modified = {} // соответствие файл - массив пуллреквестов, которые его изменили
  for (const { id, files } of prs) {
    for (const file of files) {
      if (!(file in modified)) modified[file] = []
      modified[file].push(id)
    }
  }

  // смотрим только те файлы, которые изменены больше чем в одном pr
  const conflicts = Object.values(modified).filter(i => i.length > 1)
  const conflictedPRs = Object.fromEntries(prs.map(i => [ i.id, new Set()]))
  for (const conflict of conflicts)
    for (const prId of conflict)
      conflictedPRs[prId] = new Set([...conflictedPRs[prId], ...conflict ])

  for (const pr of prs) {
    pr.n = pr.files.length
    delete pr.files
  }
  
  let max = -1
  let result = []

  const notConflicted = prs.filter(pr => !conflictedPRs[pr.id].size)
  console.log(notConflicted)
  prs = prs.filter(pr => conflictedPRs[pr.id].size > 1)
  const merge = (j, n, selected) => {
    if (n > max) { max = n; result = selected }

    for (let i = j; i < prs.length; i++) {
      const pr = prs[i]
      const conflicted = conflictedPRs[pr.id]
      if (selected.some(({ id }) => conflicted.has(id))) continue
      merge(i + 1, n + pr.n, [ ...selected, pr ])
    }
  }

  merge(0, 0, [])
  return [ ...notConflicted, ...result ].sort((a, b) => a.created - b.created).map(i => i.id)
}
  // const created = Object.fromEntries(prs.map(i => [i.id, i.created]))

  


  // const modified = {} // соответствие файл - массив пуллреквестов, которые его изменили
  // for (const { id, files } of prs) {
  //   for (const file of files) {
  //     if (!(file in modified)) modified[file] = []
  //     modified[file].push(id)
  //   }
  // }

  // const conflicts = Object.values(modified).filter(i => i.length > 1)
  // const prsConflicted = {}
  // for (let i = 0; i < conflicts.length; i++) {
  //   for (const prId of conflicts[i]) {
  //     if (!(id in conflicted)) conflicted[id] = []
  //     conflicted[id].push(i)
  //   }
  // }

  // const nonConflicted = pullRequests.map(i => i.id).filter(i => !conflicted[i])

  // const rec = (notMergedPRs, mergedFiles, mergedPRs) => {
  //   if (!notMergedPRs.length) return { mergedFiles, mergedPRs }
  //   const [ [ pr, modifiedFiles ], ...prs ] = notMergedPRs
  //   const declined = rec(prs, mergedFiles, mergedPRs)
  //   if (modifiedFiles.some(file => mergedFiles.has(file))) return declined
  //   const applied = rec(prs, new Set([ ...mergedFiles, ...modifiedFiles ]), [ ...mergedPRs, pr ])
  //   return (applied.mergedFiles.size >= declined.mergedFiles.size) ? applied : declined
  // }

  // const { mergedPRs } = rec(Object.entries(conflicted), new Set(), [])
  // return [ ...nonConflicted, ...mergedPRs ].sort((a, b) => created[a] - created[b])
// }

console.log(
  module.exports([])
)

console.log(
  module.exports([
    {
      id: '#1',
      created: 1536077100,
      files: ['.gitignore', 'README.md']
    },
    {
      id: '#2',
      created: 1536077700,
      files: ['index.js', 'package-lock.json', 'package.json']
    },
    {
      id: '#3',
      created: 1536077800,
      files: ['.pnp.js', 'yarn.lock']
    }
  ])
) // [ "#1", "#2", "#3" ]

console.log(
  module.exports([
    {
      id: '#1',
      created: 1536074100,
      files: ['README.md']
    },
    {
      id: '#2',
      created: 1536078700,
      files: ['README.md']
    },
    {
      id: '#3',
      created: 1536097800,
      files: ['README.md']
    }
  ])
) // [ "#1" ]

console.log(
  module.exports([
    {
      id: '#1',
      created: 1536077100,
      files: ['.gitignore', 'README.md']
    },
    {
      id: '#2',
      created: 1536077700,
      files: ['index.js', 'package-lock.json', 'package.json']
    },
    {
      id: '#3',
      created: 1536077800,
      files: ['.pnp.js', 'package-lock.json', 'yarn.lock']
    },
    {
      id: '#4',
      created: 1536077900,
      files: ['index.spec.js', 'index.spec.ts', 'index.ts']
    },
    {
      id: '#5',
      created: 1536078900,
      files: ['index.html', 'index.ts']
    }
  ]) 
) // [ #1, #2, #4 ]