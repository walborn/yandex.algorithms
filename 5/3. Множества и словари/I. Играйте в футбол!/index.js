const fs = require('fs')
const testcase = 10
const input = fs.readFileSync(`${__dirname}/tests/${testcase}`, 'utf8').split('\n')

// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').split('\n')
//*/


let a, b
const minutes = new Array(91)
let result = []
const scoresByTeam = {}
const scoresByPlayer = {}
const opens = {}
const players = {}

const total = (a) => a?.reduce((r, i) => r + i, 0) || 0
const mean = (a, len = a?.length) => total(a) / (len || 1)

// "<Team A>" - "<Team B>" <Score A>:<Score B>
while (line = input.shift()) {
  if (/".+" - ".+" \d+:\d+/.test(line)) {
    let [teamA, teamB, scoreA, scoreB] = line.match(/(".+") - (".+") (\d+):(\d+)/).slice(1, 5)

    a = +scoreA
    b = +scoreB

    if (!scoresByTeam[teamA]) scoresByTeam[teamA] = []
    scoresByTeam[teamA].push(a)
    if (!scoresByTeam[teamB]) scoresByTeam[teamB] = []
    scoresByTeam[teamB].push(b)

    const scores = {}
    let firstA, firstB
    for (let i = 0; i < a; ++i) {
      const [player, minute] = input.shift().match(/([a-zA-Z\s]+) (\d+)'/).slice(1, 3)
      players[player] = teamA
      if (!minutes[+minute]) minutes[+minute] = {}
      minutes[+minute][player] = (minutes[+minute][player] || 0) + 1

      if (!firstA) firstA = [+minute, player, teamA]
      scores[player] = (scores[player] || 0) + 1
    }
    for (let i = 0; i < b; ++i) {
      const [player, minute] = input.shift().match(/([a-zA-Z\s]+) (\d+)'/).slice(1, 3)
      players[player] = teamB
      if (!minutes[+minute]) minutes[+minute] = {}
      minutes[+minute][player] = (minutes[+minute][player] || 0) + 1
      if (!firstB) firstB = [+minute, player, teamB]

      scores[player] = (scores[player] || 0) + 1
    }

    let first = firstA || firstB
    if (first) {
      if (firstA && firstB && firstA[0] > firstB[0]) first = firstB

      const [m, p, t] = first
      opens[p] = (opens[p] || 0) + 1
      opens[t] = (opens[t] || 0) + 1
    }
    // else {
    //   opens[teamB] = (opens[teamB] || 0) + 1
    // }
    for (const player in scores) {
      if (!scoresByPlayer[player]) scoresByPlayer[player] = []
      scoresByPlayer[player].push(scores[player])
    }
    continue
  }

  if (line.startsWith('Total goals for')) {
    const team = line.slice('Total goals for '.length)
    result.push(total(scoresByTeam[team]))
  }

  if (line.startsWith('Mean goals per game for')) {
    const team = line.slice('Mean goals per game for '.length)
    result.push(mean(scoresByTeam[team]))
  }

  if (line.startsWith('Total goals by')) {
    const player = line.slice('Total goals by '.length)
    result.push(total(scoresByPlayer[player]))
  }
  if (line.startsWith('Mean goals per game by')) {
    const player = line.slice('Mean goals per game by '.length)
    const games = scoresByTeam[players[player]].length
    result.push(mean(scoresByPlayer[player], games))
  }
  if (line.startsWith('Goals on minute ')) {
    const [minute, player] = line.match(/Goals on minute (\d+) by ([a-zA-Z\s]+)/).slice(1, 3)
    result.push(minutes[+minute]?.[player] || 0)
  }

  if (line.startsWith('Goals on first ')) {
    const [minute, player] = line.match(/Goals on first (\d+) minutes by ([a-zA-Z\s]+)/).slice(1, 3)
    result.push(total(minutes.slice(0, +minute + 1).map(i => i?.[player] || 0)))
  }
  if (line.startsWith('Goals on last ')) {
    const [minute, player] = line.match(/Goals on last (\d+) minutes by ([a-zA-Z\s]+)/).slice(1, 3)
    result.push(total(minutes.slice(91 - +minute).map(i => i?.[player] || 0)))
  }

  if (line.startsWith('Score opens by')) {
    const teamOrPlayer = line.slice('Score opens by '.length)
    result.push(opens[teamOrPlayer] || 0)
  }
}

result = result.join('\n')

/*
fs.writeFileSync('output.txt', result.toString())

*/


const answer = fs.readFileSync(`${__dirname}/tests/answers/${testcase}.a`, 'utf8').split('\n').map(Number)

console.log(answer[119], answer[120])
for (let i = 0; i < result.length; ++i) {
  if (result[i] !== answer[i]) {
    console.log(i, result[i], answer[i])
  }
}

