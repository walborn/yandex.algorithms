# B. Миссия джедая Ивана

|   |   |
|---|---|
|Ограничение времени|1 секунда|
|Ограничение памяти|256 Мб|
|Ввод|стандартный ввод|
|Вывод|стандартный вывод|

Юный джедай Иван был заброшен на Звезду Смерти с заданием уничтожить её. Для того, чтобы уничтожить Звезду Смерти, ему требуется массив неотрицательных целых чисел aiai​ длины NN. К сожалению, у Ивана нет этого массива, но есть секретный документ с требованиями к этому массиву, который ему передал его старый друг Дарт Вейдер.

В этом документе содержится квадратная матрица mm размера NN, где элемент в ii-й строке в jj-м столбце равен побитовому "И" чисел aiai​ и ajaj​. Для повышения безопасности главная диагональ матрицы была уничтожена и вместо чисел на ней были записаны нули. Помогите Ивану восстановить массив a и выполнить свою миссию.

Гарантируется, что решение всегда существует. Если решений несколько, выведите любое.

## Формат ввода

В первой строке содержится число NN (1≤N≤10001≤N≤1000) — размер матрицы.

Каждая из последующих NN строк содержит по NN целых чисел mijmij​ (0≤mij≤90≤mij​≤9) — элементы матрицы.

## Формат вывода

В единственной строке выведите NN целых неотрицательных чисел, не превышающих 100100 — требуемый массив aa.

### Пример 1

|Ввод<br><br> ![Скопировать ввод](https://yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif)|Вывод<br><br> ![Скопировать вывод](https://yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif)|
|---|---|
|3<br>0 1 1<br>1 0 1<br>1 1 0|1 1 1|

### Пример 2

|Ввод<br><br> ![Скопировать ввод](https://yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif)|Вывод<br><br> ![Скопировать вывод](https://yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif)|
|---|---|
|5<br>0 0 1 1 1<br>0 0 2 0 2<br>1 2 0 1 3<br>1 0 1 0 1<br>1 2 3 1 0|1 2 3 1 3|