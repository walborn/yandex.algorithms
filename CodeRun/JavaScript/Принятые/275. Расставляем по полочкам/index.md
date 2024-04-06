# 275. Расставляем по полочкам
фронтенд сложная
Маша работает мерчендайзером в компании АльМека. Завтра у неё экзамен после переподготовки и она к нему готовится в последний день. В голове у Маши всё перемешалось. Помнит она то ли про товары, то ли про отзывы на товары. Нужно помочь ей расставить всё по местам и сериализовать итоговый результат в текстовый документ.

Известно, что есть 2 типа данных: good и comment.

```js
class Good {
  name: string;
  comments: Comment[];
  related: Good[];
}

class Comment {
  text: string;
  comments: Comment[];
  parent: Good | Comment;
}
```
На входе: Ссылка на JS-объект

На выходе: Строка в формате Markdown со всеми найденными данными

Markdown-документ должен иметь следующий формат:
```md
## Отзывы

- %Отзыв 1% - про %Товар 1%
  - %Ответ на отзыв 1%
  - %Ответ на отзыв 2%
    - %Ответ на ответ к отзыву 1%
  - %Ответ на отзыв 3%
- %Отзыв 2% - про %Товар 2%
- %Отзыв 3% - про %Товар 3%
  - %Ответ на отзыв 4%
  - %Ответ на отзыв 5%

## Товары

- %Товар 1%
  * %Товар 2%
- %Товар 3%
  * %Товар 2%
  * %Товар 4%
```

## Шаблон решения
Ваше решение должно содержать CommonJS-модуль, экспортирующий функцию, соответствующую следующей сигнатуре:

```js
/**
 * @param {Good|Comment} data - ссылка на товар, отзыв или ответ на отзыв,
 * из которой нужно восстановить все возможные данные
 * @return {string}
 */
module.exports = function (data) {
  // ваш код
  return '…';
}
```
## Примеры
```js
// Товары в памяти
const Good1 = { type: 'good', name: 'Смесь Friso Frisolaс Gold 2035', comments: [], related: [] };
const Good2 = { type: 'good', name: 'МакБук PRO 2035 13\' w/ clickbar', comments: [], related: [] };
const Good3 = { type: 'good', name: 'Фигурка Funko POP! Vinyl: Overwatch Уинстон', comments: [], related: [] };

// Отзывы в памяти
const Comment1 = { type: 'comment', text: 'Классный ноутбук!', comments: [], parent: null };
const Comment2 = { type: 'comment', text: 'Не понравился! Кликбар не работает совсем!', comments: [], parent: null };
const Comment3 = { type: 'comment', text: 'Хорошая цена, у малыша не было аллергии на неё', comments: [], parent: null };

// Похожие товары
Good3.related.push(Good1, Good2)
Good1.related.push(Good3)
Good2.related.push(Good3)

// Расставляем комментарии
Comment1.parent = Good2;
Good2.comments.push(Comment1);

Comment2.parent = Comment1;
Comment1.comments.push(Comment2);

Comment3.parent = Good1;
Good.comments.push(Comment3);

// А ссылка осталась только на третий отзыв :-(
module.exports = Comment3;
```
Если вывести ссылку, получается такая структура:

```js
{ type: 'comment',
  text: 'Хорошая цена, у малыша не было аллергии на неё',
  comments: [],
  parent:
   { type: 'good',
     name: 'Смесь Friso Frisolaс Gold 2035',
     comments: [ [Circular] ],
     related:
      [ { type: 'good',
          name: 'Фигурка Funko POP! Vinyl: Overwatch Уинстон',
          comments: [],
          related:
           [ [Circular],
             { type: 'good',
               name: 'МакБук PRO 2035 13\' w/ clickbar',
               comments:
                [ { type: 'comment',
                    text: 'Классный ноутбук!',
                    comments:
                     [ { type: 'comment',
                         text: 'Не понравился! Кликбар не работает совсем!',
                         comments: [],
                         parent: [Circular] } ],
                    parent: [Circular] } ],
               related: [ [Circular] ] } ] } ] } }
```
На выходе должен получится текст в формате Markdown со всеми найденными задачами и пользователями, отсортированными в алфавитном порядке:

## Отзывы

- Классный ноутбук! - про МакБук PRO 2035 13\' w/ clickbar
  - Не понравился! Кликбар не работает совсем!
- Хорошая цена, у малыша не было аллергии на неё - про Смесь Friso Frisolaс Gold 2035

## Товары

- МакБук PRO 2035 13' w/ clickbar
  * Фигурка Funko POP! Vinyl: Overwatch Уинстон
- Смесь Friso Frisolaс Gold 2035
  * Фигурка Funko POP! Vinyl: Overwatch Уинстон
- Фигурка Funko POP! Vinyl: Overwatch Уинстон
  * МакБук PRO 2035 13' w/ clickbar
  * Смесь Friso Frisolaс Gold 2035