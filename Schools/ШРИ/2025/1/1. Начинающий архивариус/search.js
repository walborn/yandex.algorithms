let documents = [
  {
    id: '1',
    deps: ['2'], // зависит от документа 2
    versions: [
      {
        from: '2025-01-01T00:00:00Z',
        to: '2025-02-01T00:00:00Z',
        text: 'String 11',
      },
      {
        from: '2025-02-01T00:00:00Z',
        to: '2025-03-01T00:00:00Z',
        text: 'String 12',
      },
      {
        from: '2025-03-01T00:00:00Z',
        to: '2025-04-01T00:00:00Z',
        text: 'String 13',
      },
    ],
  },
  {
    id: '2',
    deps: [],
    versions: [
      {
        from: '2025-01-01T00:00:00Z',
        to: '2025-02-01T00:00:00Z',
        text: 'String 21',
      },
      {
        from: '2025-02-01T00:00:00Z',
        to: '2025-03-01T00:00:00Z',
        text: 'String 22',
      },
      {
        from: '2025-03-01T00:00:00Z',
        to: '2025-04-01T00:00:00Z',
        text: 'String 23',
      },
    ],
  },
]

let from = '2025-03-01'
let to = '2025-03-30'
//,{\"id\":\"2\",\"deps\":[\"4\"],\"versions\":[{\"from\":\"2025-01-01T00:00:00Z\",\"to\":\"2025-02-01T00:00:00Z\",\"text\":\"String 21\"},{\"from\":\"2025-02-01T00:00:00Z\",\"to\":\"2025-03-01T00:00:00Z\",\"text\":\"String 22\"},{\"from\":\"2025-03-01T00:00:00Z\",\"to\":\"2025-04-01T00:00:00Z\",\"text\":\"String 23\"}]},{\"id\":\"3\",\"deps\":[],\"versions\":[{\"from\":\"2025-01-01T00:00:00Z\",\"to\":\"2025-02-01T00:00:00Z\",\"text\":\"String 31\"},{\"from\":\"2025-02-01T00:00:00Z\",\"to\":\"2025-03-01T00:00:00Z\",\"text\":\"String 32\"},{\"from\":\"2025-03-01T00:00:00Z\",\"to\":\"2025-04-01T00:00:00Z\",\"te


documents3 = [
  {
    "id": 1,
    "deps": [2, 3],
    "versions": [
      {
        "from": '2025-01-01T00:00:00Z',
        "to": '2025-01-01T00:00:00Z',
        "text": "String 11"
      },
      {
        "from": '2025-02-01T00:00:00Z',
        "to": '2025-03-01T00:00:00Z',
        "text": "String 12"
      },
      {
        "from": '2025-03-01T00:00:00Z',
        "to": '2025-04-01T00:00:00Z',
        "text": "String 13"
      }
    ]
  },
  {
    "id": 2,
    "deps": [
      4
    ],
    "versions": [
      {
        "from": 1735689600000,
        "to": 1738368000000,
        "text": "String 21"
      },
      {
        "from": 1738368000000,
        "to": 1740787200000,
        "text": "String 22"
      },
      {
        "from": '2025-03-01T00:00:00.000Z',
        "to": '2025-04-01T00:00:00.000Z',
        "text": "String 23"
      }
    ]
  },
  {
    "id": 3,
    "deps": [],
    "versions": [
      {
        "from": 1735689600000,
        "to": 1738368000000,
        "text": "String 31"
      },
      {
        "from": 1738368000000,
        "to": 1740787200000,
        "text": "String 32"
      },
      {
        "from": '2025-03-01T00:00:00.000Z',
        "to": '2025-04-01T00:00:00.000Z',
        "text": "String 33"
      }
    ]
  },
  {
    "id": 4,
    "deps": [],
    "versions": [
      {
        "from": '2025-02-01T00:00:00.000Z',
        "to": '2025-02-15T00:00:00.000Z',
        "text": "String 41"
      }
    ]
  }
]

// console.log(new Date(1743465600000).toISOString())

function search(from, to, documents) {
  // make date in milliseconds
  const getFrom = (dateString) => dateString === null ? -Infinity : new Date(dateString).getTime() / 1000 | 0
  const getTo = (dateString) => dateString === null ? Infinity : new Date(dateString).getTime() / 1000 | 0

  from = getFrom(from)
  to = getTo(to)

  const docs = documents.reduce((r, i) => ({ ...r, [i.id]: i }), {})

  for (const document of documents) {
    for (const version of document.versions) {
      version.from = getFrom(version.from)
      version.to = getTo(version.to)
    }
  }
  // // Версия считается активной, только если у всех документов из массива deps документа есть актуальные на данный период версии. Если в течение запрошенного периода версии менялись - нужно вернуть последнюю актуальную. Если какой-то документ закончил своё действие в этот период - вернуть последнюю актуальную версию.
  // const isActiveDoc = (docId) => {


  //   for (const depId of docs[docId].deps)
  //     if (!hasActualVersion(docs[depId])) return false
  //   return true
  // }

  const hasActualVersion = (versions) => {
    for (const version of versions)
      if (version.from < to && version.to > from) return true
    return false
  }

  const memo = {}
  const dfs = ({ id, deps, versions }) => {
    if (memo[id]) return memo[id]

    for (const depId of deps) {
      if (!dfs(docs[depId])) {
        return memo[id] = false
      }
    }
    return memo[id] = hasActualVersion(versions)
  }

  for (const document of documents) {
    dfs(document)
  }

  const getLastActualVersion = (doc) => {
    let latest = { to: from }
    for (const version of doc.versions) {
      if (version.from < to && version.to > latest.to)
        latest = version
    }
    return 'from' in latest ? latest : null
  }

  const result = []
  for (const document of documents) {
    if (memo[document.id]) {
      const actualVersion = getLastActualVersion(document)
      if (actualVersion) result.push(actualVersion)
    }
  }
  return result.map(i => i.text)
}

console.log(search('2025-02-01', '2025-02-28', documents))
// console.log(search(from, to, documents))

module.exports = { search }
