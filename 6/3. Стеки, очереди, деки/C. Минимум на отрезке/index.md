# C. Минимум на отрезке

|   |   |
|---|---|
|Ограничение времени|1 секунда|
|Ограничение памяти|64Mb|
|Ввод|стандартный ввод или input.txt|
|Вывод|стандартный вывод или output.txt|

Рассмотрим последовательность целых чисел длины n. По ней с шагом 1 двигается «окно» длины `k`, то есть сначала в «окне» видны первые kk чисел, на следующем шаге в «окне» уже будут находиться `k` чисел, начиная со второго, и так далее до конца последовательности. Требуется для каждого положения «окна» определить минимум в нём.

## Формат ввода

В первой строке входных данных содержатся два натуральных числа `n` и `k` (n ≤  150000, k
k ≤ 10000, k ≤  n) – длины последовательности и «окна», соответственно. На следующей строке находятся nn чисел – сама последовательность.

## Формат вывода

Выходные данные должны содержать n−k+1n−k+1 строк – минимумы для каждого положения «окна».

## Пример

|Ввод<br><br> ![Скопировать ввод](https://yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif)|Вывод<br><br> ![Скопировать вывод](https://yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif)|
|---|---|
|7 3<br>1 3 2 4 5 3 1|1<br>2<br>2<br>3<br>1|

## Примечания

Обратите внимание, что решение с непосредственным подсчётом минимума для каждого положения окна не пройдёт по времени.