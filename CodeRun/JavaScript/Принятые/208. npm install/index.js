/*
// описание зависимости
type PackageDependency = {
  packageName: string // имя пакета
  version: number // номер версии пакета
}

// описание версии
type PackageVersion = {
  version: number // номер версии пакета
  dependencies?: PackageDependency[] // список зависимостей пакета
}

// входные данные 
type AllDependencies = {
  [packageName: string]: {
    versions: PackageVersion[] // все версии пакета
  }
}
*/
const data1 = {
    react: {
        versions: [
            { version: 18 },
            { version: 17 },
            { version: 16 },
        ],
    },
    router: {
        versions: [
            {
                version: 21,
                dependencies: [{packageName: 'react', version: 18}]
            },
            {
                version: 20,
                dependencies: [{packageName: 'react', version: 18}]
            },
            {
                version: 19,
                dependencies: [{packageName: 'react', version: 17}]
            },
            {
                version: 18,
                dependencies: [{packageName: 'react', version: 17}]
            },
            {
                version: 17,
                dependencies: [{packageName: 'react', version: 16}]
            },
        ]
    },
    uikit: {
        versions: [
            {
                version: 9,
                dependencies: [
                    {packageName: 'router', version: 20},
                    {packageName: 'react', version: 17},
                ]
            },
            {
                version: 8,
                dependencies: [
                    {packageName: 'router', version: 19},
                    {packageName: 'react', version: 17},
                ]
            },
            {
                version: 7,
                dependencies: [
                    {packageName: 'router', version: 18},
                    {packageName: 'react', version: 17},
                ]
            },
        ]
    }
}

const data2 = {"lite-components":{"versions":[{"version":17,"dependencies":[{"packageName":"pretty-colors","version":198}]},{"version":16,"dependencies":[{"packageName":"pretty-colors","version":198}]},{"version":15,"dependencies":[{"packageName":"pretty-colors","version":197}]},{"version":14,"dependencies":[{"packageName":"pretty-colors","version":196}]},{"version":13,"dependencies":[{"packageName":"pretty-colors","version":196}]},{"version":12,"dependencies":[{"packageName":"pretty-colors","version":196}]}]},"lite-design":{"versions":[{"version":5,"dependencies":[{"packageName":"css-helper","version":41}]},{"version":4,"dependencies":[{"packageName":"css-helper","version":39}]},{"version":3,"dependencies":[{"packageName":"css-helper","version":39}]},{"version":2,"dependencies":[{"packageName":"css-helper","version":36}]},{"version":1,"dependencies":[{"packageName":"css-helper","version":33}]}]},"pretty-colors":{"versions":[{"version":198,"dependencies":[{"packageName":"css-helper","version":40}]},{"version":197,"dependencies":[{"packageName":"css-helper","version":38}]},{"version":196,"dependencies":[{"packageName":"css-helper","version":36}]},{"version":195,"dependencies":[{"packageName":"css-helper","version":36}]},{"version":194,"dependencies":[{"packageName":"css-helper","version":35}]}]},"css-helper":{"versions":[{"version":41},{"version":40},{"version":39},{"version":38},{"version":37},{"version":36},{"version":35},{"version":34},{"version":33}]}}

const data3 = {
  "react": {"versions":[{"version":18},{"version":17},{"version":16}]},
  "router":{"versions":[{"version":21,"dependencies":[{"packageName":"react","version":18}]},{"version":20,"dependencies":[{"packageName":"react","version":18}]},{"version":19,"dependencies":[{"packageName":"react","version":17}]},{"version":18,"dependencies":[{"packageName":"react","version":17}]},{"version":17,"dependencies":[{"packageName":"react","version":16}]}]},
  "uikit":{"versions":[{"version":9,"dependencies":[{"packageName":"router","version":20},{"packageName":"react","version":17}]},{"version":8,"dependencies":[{"packageName":"router","version":19},{"packageName":"react","version":17}]},{"version":7,"dependencies":[{"packageName":"router","version":18},{"packageName":"react","version":17}]}]},
}
function getLastCompatibleDependencies(data, packageA, packageB) {
  data[packageA].versions.sort((a, b) => b.version - a.version)
  data[packageB].versions.sort((a, b) => b.version - a.version)

  const dfs = ({ packageName, version }, visited) => {
    if (packageName in visited) return visited[packageName] === version
    visited[packageName] = version
  
    const { dependencies = [] } = data[packageName].versions.find(x => x.version === version)
  
    for (let i of dependencies) if (!dfs(i, visited)) return false
    return true
  }
  
  const run = () => {
    for (let { version } of data[packageA].versions) {
      const visitedA = {}
  
      if (dfs({ packageName: packageA, version }, visitedA)) {
        if (packageB in visitedA) return visitedA
        for (let { version } of data[packageB].versions) {
          const visitedB = { ...visitedA }
          console.log(visitedB)
          if (dfs({ packageName: packageB, version }, visitedB)) return visitedB
        }
      }
    }
    return 'unknown'
  }
  
  const packages = run()
  return { [packageA]: packages[packageA], [packageB]: packages[packageB] }
}

exports.getLastCompatibleDependencies = getLastCompatibleDependencies


let data, packageA, packageB
// test 1
// data = data1
// packageA = 'uikit'
// packageB = 'router'
// data = data2
// packageA = 'lite-design' // 'lite-components'
// packageB = 'css-helper' // 'lite-design'
data = data3
packageA = 'router'
packageB = 'uikit'
console.log(getLastCompatibleDependencies(data, packageA, packageB))



