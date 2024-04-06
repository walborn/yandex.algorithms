module.exports = function(content) {
  if (typeof content !== 'string') return []
  if (!content) return [ content ]

  const isEmptySymbol = x => x === '\n' || x === '\t' || x === ' ' || x === ';'
  let i = 0
  if (!content.startsWith('describe'))
    for (i = 1; i < content.length; i++)
      if (isEmptySymbol(content[i - 1]) && content.slice(i).startsWith("describe('")) break

  const imports = content.slice(0, i)
  if (i === content.length) return [ imports ]
  const end = content.lastIndexOf('})')
  const ending = content.slice(end) + (content[content.length - 1] === '\n' ? '' : '\n')
  const describe = content.slice(i, end)
  
  const its = []
  let j = describe.length
  for (let i = describe.length - 1; i; i--) {
    if (isEmptySymbol(describe[i - 1]))
      if (describe.slice(i).startsWith("it('") || describe.slice(i).startsWith("it.skip('")) {
        its.unshift(describe.slice(i, j))
        j = i
      }
  }
  return its.map(it => `${imports}${describe.slice(0, j).trim()}\n  ${it.trim()}\n${ending}`)
}

const test1 = `describe('suite', function () {
  it('test1', function () {
    cy.dataset({ method: 'user_token', kwargs: { role: 'admin' } }, 'user').log('Создаём админа');
    cy.get('@user').then((user) => {
      cy.visit(user.url).log('Авторизация');
      cy.get('[data-test=\"root\"]').log('Авторизация пройдена.');
      cy.visit('/stores/incorrectstoreid').log('Загружаем страницу c неправильным id склада');
      cy.url().should('contain', '/error').log('Произошел редирект на страницу с ошибкой');
      cy.get('[data-test=\"error status\"]').contains('403');
      cy.get('[data-test=\"error code\"]').contains('Страница недоступна');
      cy.get('[data-test=\"error text\"]').contains('У вас нет прав доступа к данной странице');
      cy.get('[data-test=\"go home button\"]');
    });
  });
  it('test2', function () {
    cy.dataset({ method: 'user_token', kwargs: { role: 'admin' } }, 'user').log('Создаём админа');
    cy.get('@user').then((user) => {
      cy.visit(user.url).log('Авторизация');
      cy.get('[data-test=\"root\"]').log('Авторизация пройдена.');
      cy.visit('/stores/incorrectstoreid').log('Загружаем страницу c неправильным id склада');
      cy.url().should('contain', '/error').log('Произошел редирект на страницу с ошибкой');
      cy.get('[data-test=\"error status\"]').contains('403');
      cy.get('[data-test=\"error code\"]').contains('Страница недоступна');
      cy.get('[data-test=\"error text\"]').contains('У вас нет прав доступа к данной странице');
      cy.get('[data-test=\"go home button\"]');
    });
  });
});
`

const test2 = `// Some imports and comments
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
`

console.log(module.exports(test2)[0])
