function getLastCommonCommitMessage(commits, branches) {
  const [ x, y ] = branches.map(branch => commits.filter(commit => commit.branches?.includes(branch)))
  let xCommits = new Set()
  while (x.length) {
    const commit = x.shift()
    xCommits.add(commit.id)
    if (commit.parents) x.push(...commit.parents.map(id => commits.find(i => i.id === id)))
  }
  let yCommits = new Set()
  while (y.length) {
    const commit = y.shift()
    yCommits.add(commit.id)
    if (commit.parents) y.push(...commit.parents.map(id => commits.find(i => i.id === id)))
  }
  const xyCommits = [ ...xCommits ].filter(id => yCommits.has(id))
  if (!xyCommits.length) return new Error('No common commit')
  
  let latest = { timestamp: null }
  for (let id of xyCommits) {
    const commit = commits.find(c => c.id === id)
    if (latest.timestamp >= commit.timestamp) continue
    latest = commit
  }
  return latest.message || ''
}

module.exports = {getLastCommonCommitMessage}

// const test1 = getLastCommonCommitMessage([
//   {
//     id: '1',
//     message: 'initial commit',
//     timestamp: 1624010073113, // 9:54:33
//   },
//   {
//     id: '2',
//     parents: ['1'],
//     message: 'add layout',
//     timestamp: 1624010082219, // 9:54:42
//   },
//   {
//     id: '3',
//     parents: ['2'],
//     message: 'fix bugs',
//     timestamp: 1624010109039, // 9:55:09
//     branches: ['master', 'bugfix']
//   },
//   {
//     id: '4',
//     parents: ['2'],
//     message: 'add link',
//     timestamp: 1624010179662, // 9:56:19
//     branches: ['feature/link']
//   }
//   ], ['bugfix', 'feature/link']) // 'add layout'

// console.log(test1)

// const test2 = getLastCommonCommitMessage([{
//   id: '1',
//   message: 'initial commit',
//   timestamp: 1624010073113,
//   branches: ['master'],
// }], ['master', 'master']) // 'initial commit'
// console.log(test2)

// const test3 = getLastCommonCommitMessage([], ['ghost', 'bla-bla-bla-branch']) // Error('No common commit')
// console.log(test3)

const test4 = {"commits":[{"id":"0","timestamp":1625055166427,"message":"initial commit"},{"id":"1","timestamp":1625055166428,"message":"add layout","parents":["0"]},{"id":"2","timestamp":1625055166429,"message":"fix bugs","branches":["master","bugfix"],"parents":["1"]},{"id":"3","timestamp":1625055166430,"message":"add link","branches":["feature/link"],"parents":["1"]}],"branches":["bugfix","feature/link"]}
// console.log(getLastCommonCommitMessage(test4.commits, test4.branches)) // 'Initial)
console.log(getLastCommonCommitMessage([], ['a', 'b']))