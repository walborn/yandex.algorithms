# 208. npm install
> фронтенд сложная
Вася устроился фронтенд-разработчиком в крупную IT-компанию. В свой первый рабочий день он клонировал себе git-репозиторий проекта и сразу же стал смотреть package.json. Будучи любителем всего нового, Вася сразу увидел, что некоторые пакеты в dependencies устарели. Недолго думая, он сразу поменял в файле их версии на самые последние и выполнил npm install. Какой ужас! Консоль заполнили строки с описанием ошибок, ведь оказалось, что многие пакеты были связаны между собой через peerDependencies, а их свежие версии несовместимы.

Помогите Васе обновить зависимости до самых свежих совместимых версий.

Далее зависимости пакета обозначают peerDependencies.

## Условия
- Версии пакетов представляют собой натуральные числа
- Самые свежие зависимости — набор совместимых версий пакетов; такой, что любой другой набор совместимых версий имеет по крайней мере в одном из пакетов меньшую версию.
- Пакеты зависят от других пакетов, не допуская циклических зависимостей. Если некая версия пакета A — транзитивная зависимость некой версии пакета B, то никакая версия B не может являться транзитивной зависимостью никакой версии A.
- Зависимости возрастают монотонно. То есть при обновлении версии любого пакета его зависимости не могут понизить свои версии, только повысить либо не измениться.
- Список зависимостей у пакета постоянный, меняются только их версии
- Версии зависимостей каждого пакета фиксированы (нет диапазонов)
- Совместимые версии гарантированно существуют

## Формат входных данных
? - необязательные поля (могут отсутствовать в объекте)
```ts
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
```

## Формат выходных данных
Объект с версиями пакетов.

```ts
type ResultDependencies = {
  [packageName: string]: number
}
```

## Шаблон решения
```js
function getLastCompatibleDependencies(data, packageA, packageB) {
  // ваше решение
}

exports.getLastCompatibleDependencies = getLastCompatibleDependencies
```

## Примеры
Красными стрелками показаны зависимости у совместимых версий, красным текстом выделены версии запрашиваемых пакетов (uikit и router).

[example](./Пример.jpg)

Вход
```js
{
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
```
```js
'uikit'
```
```js
'router'
```

Выход
```js
{
    uikit: 8,
    router: 19,
}
```
### Более сложный пример

Здесь мы ищем свежие совместимые версии у `lite-components` и `lite-design` (14 и 2 соотвественно).

[Более сложный пример.jpg](Более сложный пример)

Заметьте, если мы будем рассматривать другую пару пакетов, то картина меняется: lite-design = 5 и css-helper = 41 дают самые свежие версии (если бы в package.json были бы только эти два пакета).

[./Более сложный пример 2.jpg](Более сложный пример 2.jpg)

Пример 1
Ввод
```js
{"data":{"lite-components":{"versions":[{"version":17,"dependencies":[{"packageName":"pretty-colors","version":198}]},{"version":16,"dependencies":[{"packageName":"pretty-colors","version":198}]},{"version":15,"dependencies":[{"packageName":"pretty-colors","version":197}]},{"version":14,"dependencies":[{"packageName":"pretty-colors","version":196}]},{"version":13,"dependencies":[{"packageName":"pretty-colors","version":196}]},{"version":12,"dependencies":[{"packageName":"pretty-colors","version":196}]}]},"lite-design":{"versions":[{"version":5,"dependencies":[{"packageName":"css-helper","version":41}]},{"version":4,"dependencies":[{"packageName":"css-helper","version":39}]},{"version":3,"dependencies":[{"packageName":"css-helper","version":39}]},{"version":2,"dependencies":[{"packageName":"css-helper","version":36}]},{"version":1,"dependencies":[{"packageName":"css-helper","version":33}]}]},"pretty-colors":{"versions":[{"version":198,"dependencies":[{"packageName":"css-helper","version":40}]},{"version":197,"dependencies":[{"packageName":"css-helper","version":38}]},{"version":196,"dependencies":[{"packageName":"css-helper","version":36}]},{"version":195,"dependencies":[{"packageName":"css-helper","version":36}]},{"version":194,"dependencies":[{"packageName":"css-helper","version":35}]}]},"css-helper":{"versions":[{"version":41},{"version":40},{"version":39},{"version":38},{"version":37},{"version":36},{"version":35},{"version":34},{"version":33}]}},"packageA":"lite-components","packageB":"lite-design"}
```
Вывод
{"result":{"lite-components":14,"lite-design":2}}
Пример 2
Ввод
```js
{"data":{"react":{"versions":[{"version":18},{"version":17},{"version":16}]},"router":{"versions":[{"version":21,"dependencies":[{"packageName":"react","version":18}]},{"version":20,"dependencies":[{"packageName":"react","version":18}]},{"version":19,"dependencies":[{"packageName":"react","version":17}]},{"version":18,"dependencies":[{"packageName":"react","version":17}]},{"version":17,"dependencies":[{"packageName":"react","version":16}]}]},"uikit":{"versions":[{"version":9,"dependencies":[{"packageName":"router","version":20},{"packageName":"react","version":17}]},{"version":8,"dependencies":[{"packageName":"router","version":19},{"packageName":"react","version":17}]},{"version":7,"dependencies":[{"packageName":"router","version":18},{"packageName":"react","version":17}]}]}},"packageA":"router","packageB":"uikit"}
```
Вывод
{"result":{"router":19,"uikit":8}}