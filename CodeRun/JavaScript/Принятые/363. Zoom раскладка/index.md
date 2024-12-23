# 363. Zoom раскладка
> фронтенд средняя
В видеоконференции участвует n участников, у каждого из них – одинаковое разрешение видео и экрана, к примеру, 1200x800. Требуется написать и экспортировать функцию раскладки видео участников на экране звонка.

Раскладка должна быть симметричной относительно вертикали, все карточки видео должны быть одинакового размера и иметь такие же соотношения высоты и ширины, как и экран. Если карточек не хватает для заполнения строки, то такая строка должна быть расположена первой сверху. Пустое пространство выше и ниже строк должно иметь одинаковую высоту.

## Примеры правильной раскладки:
[Пример раскладки](./Пример раскладки.jpg)

Нумерация карточек идет сверху вниз и слева направо, в таком же порядке их должна вернуть функция. Координаты идут по x слева направо, по y – сверху вниз.

Координаты карточек и их размер нужно округлить до ближайших целых значений, используя Math.round (иначе решение может не проходить тесты).

Размеры экрана не превышают 1920x1080, количество участников `n` не превышает 25 человек.

Подсказка: количество колонок можно посчитать как `Math.ceil(Math.sqrt(n))`.

Далее описание функции и параметров дано на Typescript, но функцию требуется написать на JS.

```ts
/**
 * @param n - количество участников
 * @param width - ширина экрана каждого участника в пикселях
 * @param height - высота экрана каждого участника в пикселях
 */
module.exports = function(n: number, width: number, height: number): Frame[] {
}
type Video = {
    width: number; // Ширина видео в пикселях
    height: number;  // Высота видео в пикселях
    x: number; // Положение левого верхнего угла видео по x относительно верхнего левого угла экрана
    y: number; // Положение левого верхнего угла видео по y относительно верхнего левого угла экрана
}
```
К примеру, если функция будет вызвана со следующими параметрами solution(1, 100, 100), то она должна вернуть [{ width: 100, height: 100, x: 0, y: 0}].

### Пример 1
Ввод
{
    "n": 1,
    "width": 100,
    "height": 100
}
Вывод
[
    {
        "x": 0,
        "y": 0,
        "width": 100,
        "height": 100
    }
]
Пример 2
Ввод
{
    "n": 2,
    "width": 1200,
    "height": 900
}
Вывод
[
    {
        "x": 0,
        "y": 225,
        "width": 600,
        "height": 450
    },
    {
        "x": 600,
        "y": 225,
        "width": 600,
        "height": 450
    }
]
Пример 3
Ввод
{
    "n": 3,
    "width": 1200,
    "height": 900
}
Вывод
[
    {
        "x": 300,
        "y": 0,
        "width": 600,
        "height": 450
    },
    {
        "x": 0,
        "y": 450,
        "width": 600,
        "height": 450
    },
    {
        "x": 600,
        "y": 450,
        "width": 600,
        "height": 450
    }
]
