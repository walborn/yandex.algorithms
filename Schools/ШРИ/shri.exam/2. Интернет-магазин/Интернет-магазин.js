// todo осталось распознать другие методы и написать логику подсчета стоимости
function obfuscation(apiClient, cart) {
  // ваше решение
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(apiClient))
  console.log(methods)
  const t = {}
  for (const method of methods) {
    const lenArgs = apiClient[method].length
    if (lenArgs === 0) t.getDefaultCurrency = method
  }
  return t
}
class ApiClient {
  // методы класса
  constructor() { }
  getNumber() { return 4 }
  getString() { return 'usd' }
  times(a, b) { return a * b }
}
const api = new ApiClient()
console.log(obfuscation(api, {}))

// function getMethods(apiClient) {
//   const methods = []
//   let api = apiClient
//   do methods.push(...Object.getOwnPropertyNames(api))
//   while (api = Object.getPrototypeOf(api))
//   return methods.filter((method, i, a) => method !== a[i + 1] && typeof apiClient[method] === 'function')
// }


function getMethods(o) {
  let methods = new Set();
  while (o = Reflect.getPrototypeOf(o)) {
    Reflect.ownKeys(o).forEach((k) => methods.add(k));
  }
  return methods
}