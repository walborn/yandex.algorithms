# 311. Расширение транспортной системы
фронтенд средняя
В светлом космическом будущем люди колонизировали Луну и могут создавать работающие маршруты отправки посылок как на Землю, так и на Луну. Это выражено в виде двух классов `EarthRoute` и `MoonRoute`:

```js
class EarthRoute {
  static vault = []
  transfer(parcel) {
    parcel.destination = 'Earth'
    EarthRoute.vault.push(parcel)
  }
}

class MoonRoute {
  static warehouse = []
  transfer(parcel) {
    parcel.destination = 'Moon'
    MoonRoute.warehouse.push(parcel)
  }
}
```
Из каждого из этих классов можно создавать отдельные маршруты и отправлять любой JavaScript-объект в виде посылки. Каждому такому объекту будет прописываться поле destination, соответствующее используемому маршруту. И каждый из этих объектов попадёт в хранилище посылок, специфичное для места назначения.

Человечество готовится к дальнейшей экспансии в космос и уже построен соответствующий корабль — «Mothership». За некоторое время до вылета, нужно начать дублировать все посылки, идущие на Землю и на Луну, ещё и на корабль «Mothership».

Напишите функцию extendTransportSystem(EarthRoute, MoonRoute), которая будет:

- принимать оба класса существующих транспортных маршрутов (EarthRoute и MoonRoute) и сможет менять их
- возвращать массив, в который будут попадать такие же посылки, каждый раз, когда кто-то посылает что-то по любому из маршрутов (с помощью метода transfer)
Единственное отличие посылок на «Mothership» должно состоять в том, что у них поле destination должно быть равным 'Mothership', а изначальное значение destination должно попасть в поле origin. Все остальные поля посылки должны быть такими же.

В тестах функция extendTransportSystem(EarthRoute, MoonRoute) будет вызвана перед отправками посылок, а содержимое возвращаемого ей массива будет проверено после всех отправок.

Упрощённый пример теста:

```js
const mothershipStorage = extendTransportSystem(EarthRoute, MoonRoute)

const earthRoute1 = new EarthRoute()
const moonRoute2 = new MoonRoute()

earthRoute1.transfer({ content: 123 })
moonRoute2.transfer({ text: 'abc' })

console.log(mothershipStorage)
/* [
 *   { content: 123, origin: 'Earth', destination: 'Mothership' },
 *   { text: 'abc', origin: 'Moon', destination: 'Mothership' }
 * ]
 */

console.log(EarthRoute.vault)
/* [
 *   { content: 123, destination: 'Earth' }
 * ]
 */

console.log(MoonRoute.warehouse)
/* [
 *   { text: 'abc', destination: 'Moon' }
 * ]
 */
```
## Примечание
Решение должно представлять из себя валидный JavaScript с определением функции extendTransportSystem на верхнем уровне.