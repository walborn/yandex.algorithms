# G. Острова

|   |   |
|---|---|
|Ограничение времени|1 секунда|
|Ограничение памяти|256 Мб|
|Ввод|стандартный ввод или input.txt|
|Вывод|стандартный вывод или output.txt|

Одно разбросанное на островах Океании государство решило создать сеть автомобильных дорог (вернее, мостов). По каждому мосту можно перемещаться в обе стороны. Был разработан план очередности строительства мостов, и известно, что после постройки всех мостов можно будет проехать по ним с каждого острова на каждый (возможно, через некоторые промежуточные острова).

Однако этот момент может наступить до того, как будут построены все мосты. Вам необходимо определить такое минимальное количество мостов, после строительства которых (в порядке, определенном планом) можно будет попасть с любого острова на любой другой.

## Формат ввода

Первая строка содержит два числа: число островов NN (1≤N≤100001≤N≤10000) и количество мостов в плане MM (1≤M≤500001≤M≤50000). Далее идёт MM строк, каждая содержит два числа xx и yy (1≤x,y≤N1≤x,y≤N) — номера островов, которые соединяет очередной мост в плане.

## Формат вывода

Программа должна вывести единственное число — минимальное количество построенных мостов, после которого можно будет попасть с любого острова на любой другой.

## Пример

|Ввод<br><br> ![Скопировать ввод](https://yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif)|Вывод<br><br> ![Скопировать вывод](https://yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif)|
|---|---|
|4 5<br>1 2<br>1 3<br>2 3<br>3 4<br>4 1|4|