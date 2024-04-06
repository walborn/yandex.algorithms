# 192. Меломан и потерянная память
> фронтенд средняя
У меломана Коли в голове всё перемешалось, и остались лишь воспоминания то ли про его любимый жанр, то ли про группу. Нужно помочь ему восстановить в памяти группы и жанры и сериализовать их в документ.

Известно, что есть два типа данных: band и genre.

```js
class Band {
  name: string;
  friends: Band[];
  genres: Genre[];
}

class Genre {
  name: string;
  bands: Band[];
  subgenres: Genre[];
  parent: Genre | null;
}
```
На входе: ссылка на JS-объект. На выходе: строка в формате Markdown со всеми найденными данными.

Markdown-документ должен иметь следующий формат:
```py
## Жанры

- %Жанр 1%: %Группа 1%, %Группа 2%
- %Жанр 2%: %Группа 3%
- %Жанр 3%
  - %Поджанр 1%: %Группа 4%
- %Жанр 4%: %Группа 5%
  - %Поджанр 2%
    - %Поджанр 3%: %Группа 6%

## Группы

- %Группа 1%
- %Группа 2%, друзья: %Группа 1%
- %Группа 3%, друзья: %Группа 1%, %Группа 2%
```
## Шаблон решения
Ваше решение должно содержать CommonJS-модуль, экспортирующий функцию, соответствующую следующей сигнатуре:
```js
/**
 * @param {Band|Genre} data - ссылка на группу или жанр,
 * из которой нужно восстановить все возможные данные
 * @return {string}
 */
module.exports = function (data) {
    // ваш код
    return '…';
}
```
Примеры
```js
// Жанры в памяти
const Genre1 = { type: 'genre', name: 'Рок', bands: [], subgenres: [], parent: null };
const Genre1Sub1 = { type: 'genre', name: 'Классик-рок', bands: [], subgenres: [], parent: null };
const Genre1Sub2 = { type: 'genre', name: 'Акустик-рок', bands: [], subgenres: [], parent: null };
const Genre1Sub3 = { type: 'genre', name: 'Полурок', bands: [], subgenres: [], parent: null };
const Genre2 = { type: 'genre', name: 'Нерок', bands: [], subgenres: [], parent: null };

// Разбираемся с роком
Genre1.subgenres.push(Genre1Sub1, Genre1Sub2, Genre1Sub3);
Genre1Sub1.parent = Genre1Sub2.parent = Genre1Sub3.parent = Genre1;

// Группы в памяти
const Band1 = { type: 'band', name: 'Жёлтый мох', friends: [], genres: [] };
const Band2 = { type: 'band', name: 'Красный слой', friends: [], genres: [] };
const Band3 = { type: 'band', name: 'Бритый гриб', friends: [], genres: [] };

// И в жанрах
Band1.genres.push(Genre1Sub1);
Genre1Sub1.bands.push(Band1);

Band2.genres.push(Genre1Sub2);
Genre1Sub2.bands.push(Band2);

// А Бритый гриб лабает в двух жанрах
Band3.genres.push(Genre2);
Genre2.bands.push(Band3);
Band3.genres.push(Genre1Sub3);
Genre1Sub3.bands.push(Band3);

// Группы умеют дружить
Band1.friends.push(Band2);
Band2.friends.push(Band1);

// С некоторыми — по 2 раза, но это не взаимно
Band1.friends.push(Band3);

// Помнит Коля только про Бритый Гриб :-(
module.exports = Band3;
```
Если вывести ссылку — получается такая структура:

{ type: 'band',
  name: 'Бритый гриб',
  friends: [],
  genres:
   [ { type: 'genre',
       name: 'Нерок',
       bands: [ [Circular] ],
       subgenres: [],
       parent: null },
     { type: 'genre',
       name: 'Полурок',
       bands: [ [Circular] ],
       subgenres: [],
       parent:
        { type: 'genre',
          name: 'Рок',
          bands: [],
          subgenres:
...
На выходе должен получится текст в формате Markdown со всеми найденными жанрами и группами, отсортированными в алфавитном порядке:

## Жанры

- Нерок: Бритый гриб
- Рок
  - Акустик-рок: Красный слой
  - Классик-рок: Жёлтый мох
  - Полурок: Бритый гриб

## Группы

- Бритый гриб
- Жёлтый мох, друзья: Бритый гриб, Красный слой
- Красный слой, друзья: Жёлтый мох