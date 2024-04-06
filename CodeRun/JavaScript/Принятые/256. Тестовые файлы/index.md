# 256. Тестовые файлы
> фронтенд средняя
Разработчики написали множество e2e-тестов, используя cypress. В какой-то момент тесты решили запускать параллельно, но выяснилось, что cypress распаралелливает тесты только тогда, когда они написаны в различных файлах.

Поэтому было принято решение написать утилиту для разбития тестовых файлов на более мелкие тестовые файлы, каждый из которых будет содержать только одну пару describe + it.

Т.е. вот такой тестовый файл:

```js
// Some imports and comments
const component = require('./component');

describe('suite', function () {
  it('test1', function () {
    // Some test 1
  });
  it('test2', function () {
    // Some test 2
  });
  it.skip('test3', function () {
    // Some test 3
  });
});

```
должен быть разбит на следующие три файла:

Файл 1:

```js
// Some imports and comments
const component = require('./component');

describe('suite', function () {
  it('test1', function () {
    // Some test 1
  });
});
```
Файл 2:

```js
// Some imports and comments
const component = require('./component');

describe('suite', function () {
  it('test2', function () {
    // Some test 2
  });
});
```
Файл 3:

```js
// Some imports and comments
const component = require('./component');

describe('suite', function () {
    it.skip('test3', function () {
        // Some test 3
    });
});
```
В данной задаче требуется написать функцию, помогающую решить данную задачу:

```js
module.exports = function(content /* текст тестового файла */) {
    // ваше решение

    return [
       'содержимое первого тестового файла, как в примере выше',
       'содержимое второго тестового файла, как в примере выше',
       'содержимое третьего тестового файла, как в примере выше'
    ];
}
```
Важные уточнения:

- Задача направлена на работу с целыми строками, не на форматирование кода, анализ AST и т.д.
- Строки разделены символом '\n', в выходных файлах они должны быть разделены также
- В каждом входном файле будет лишь один describe
- Внутри describe могут быть функции it() и it.skip(). Уровень вложенности - 1, т.е. не будет ситуации, когда внутри it будет it.
- Необходимость импортов в начале финального файла проверять не надо (записываем всегда), т.е. в данной задаче не требуется использовать AST, ее можно решить, чисто работая с текстом как строками (без какого-либо форматирования кода).
- Последняя строка в исходном файле всегда пустая

## Пример 1
Ввод
```js
describe('suite', function () {
  it('test1', function () {
    cy.dataset({ method: 'user_token', kwargs: { role: 'admin' } }, 'user').log('Создаём админа');
    cy.get('@user').then((user) => {
      cy.visit(user.url).log(`Авторизация`);
      cy.get(`[data-test=\"root\"]`).log(`Авторизация пройдена.`);
        cy.visit(`/stores/incorrectstoreid`).log(`Загружаем страницу c неправильным id склада`);
        cy.url().should(`contain`, `/error`).log('Произошел редирект на страницу с ошибкой');
        cy.get(`[data-test=\"error status\"]`).contains(`403`);
        cy.get(`[data-test=\"error code\"]`).contains(`Страница недоступна`);
        cy.get(`[data-test=\"error text\"]`).contains(`У вас нет прав доступа к данной странице`);
        cy.get(`[data-test=\"go home button\"]`);
      });
    });
    it('test2', function () {
      cy.dataset({ method: 'user_token', kwargs: { role: 'admin' } }, 'user').log('Создаём админа');
      cy.get('@user').then((user) => {
        cy.visit(user.url).log(`Авторизация`);
        cy.get(`[data-test=\"root\"]`).log(`Авторизация пройдена.`);
        cy.visit(`/stores/incorrectstoreid`).log(`Загружаем страницу c неправильным id склада`);
        cy.url().should(`contain`, `/error`).log('Произошел редирект на страницу с ошибкой');
        cy.get(`[data-test=\"error status\"]`).contains(`403`);
        cy.get(`[data-test=\"error code\"]`).contains(`Страница недоступна`);
        cy.get(`[data-test=\"error text\"]`).contains(`У вас нет прав доступа к данной странице`);
        cy.get(`[data-test=\"go home button\"]`);
      });
    });
});
```
Вывод
```js
[
  "describe('suite', function () {\nit('test1', function () {\ncy.dataset({ method: 'user_token', kwargs: { role: 'admin' } }, 'user').log('Создаём админа');\ncy.get('@user').then((user) => {\ncy.visit(user.url).log(`Авторизация`);\ncy.get(`[data-test=\"root\"]`).log(`Авторизация пройдена.`);\ncy.visit(`/stores/incorrectstoreid`).log(`Загружаем страницу c неправильным id склада`);\ncy.url().should(`contain`, `/error`).log('Произошел редирект на страницу с ошибкой');\ncy.get(`[data-test=\"error status\"]`).contains(`403`);\ncy.get(`[data-test=\"error code\"]`).contains(`Страница недоступна`);\ncy.get(`[data-test=\"error text\"]`).contains(`У вас нет прав доступа к данной странице`);\ncy.get(`[data-test=\"go home button\"]`);\n});\n});\n});",
  "describe('suite', function () {\nit('test2', function () {\ncy.dataset({ method: 'user_token', kwargs: { role: 'admin' } }, 'user').log('Создаём админа');\ncy.get('@user').then((user) => {\ncy.visit(user.url).log(`Авторизация`);\ncy.get(`[data-test=\"root\"]`).log(`Авторизация пройдена.`);\ncy.visit(`/stores/incorrectstoreid`).log(`Загружаем страницу c неправильным id склада`);\ncy.url().should(`contain`, `/error`).log('Произошел редирект на страницу с ошибкой');\ncy.get(`[data-test=\"error status\"]`).contains(`403`);\ncy.get(`[data-test=\"error code\"]`).contains(`Страница недоступна`);\ncy.get(`[data-test=\"error text\"]`).contains(`У вас нет прав доступа к данной странице`);\ncy.get(`[data-test=\"go home button\"]`);\n});\n});\n});"
]