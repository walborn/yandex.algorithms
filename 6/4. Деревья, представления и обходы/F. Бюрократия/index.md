# F. Бюрократия

|   |   |
|---|---|
|Ограничение времени|3 секунды|
|Ограничение памяти|256Mb|
|Ввод|стандартный ввод или input.txt|
|Вывод|стандартный вывод или output.txt|

Мирко стал генеральным директором крупной корпорации. В компании работает N человек, пронумерованных от 1 до N , Мирко имеет номер 1 . У всех кроме Мирко есть начальник. Начальник может иметь несколько подчинённых, но не более одного непосредственного начальника.

Когда Мирко получает задание от инвесторов, он передаёт его своему подчинённому с наименьшим номером. Этот подчинённый также передаёт его своему подчинённому с наименьшим номером, и так далее, пока задание не перейдёт несчастливому работнику без подчинённых, который должен сделать задание.

Этот работник получает 1 монету, его начальник получает 2 монеты, начальник этого начальника получает 3 и так далее. Потом тот, кто на самом деле сделал работу, осознаёт, насколько эта капиталистическая система несправедлива и увольняется с работы.

Мирко получает задания до тех пор, пока в корпорации не останется всего один сотрудник — сам Мирко. Тогда он выполняет это задание, получает 1 монету и уходит из корпорации. Ему стало интересно, сколько всего монет получил каждый бывший сотрудник. Помогите ему с этим.

## Формат ввода

Первая строка содержит одно натуральное число N (1 ≤ N ≤ 2·105105) — число сотрудников компании. Следующая строка содержит N - 1 чисел a2​, a3​, ... an​ (1 ≤ ai​ < i), где ai — номер начальника i-го сотрудника.

## Формат вывода

Выведите N чисел, i-е число должно означать, сколько монет получил i-й сотрудник

### Пример 1

|Ввод<br><br> ![Скопировать ввод](https://yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif)|Вывод<br><br> ![Скопировать вывод](https://yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif)|
|---|---|
|3<br>1 1|5 1 1|

### Пример 2

| Ввод<br><br> ![Скопировать ввод](https://yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif) | Вывод<br><br> ![Скопировать вывод](https://yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif) |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 5<br>1 2 2 4                                                                                  | 13 8 1 3 1                                                                                      |

## Примечания

Пояснения к первому примеру:

![image](https://contest.yandex.ru/testsys/statement-file?hash=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Fj0ir7pCRSixkYkX.DIsYdw-PMqQViVLiV2mXIr4EBw4yVKN18SAAO6UTcKRkphhdswafKfFYi3s6loChqpVH30hXQf6I4F46CgU138EuJZs8_hk.TswWS34YxEGsdPpb-iI4bw)

Пояснения ко второму примеру:

![image](https://contest.yandex.ru/testsys/statement-file?hash=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Ylxd9VTaYfsrGGOa.eaJC6czh0OZznSHFDN7feIxNUkVvGTHJpa-6PYv0U4xhTCYBOAdrjvaFFt6IqBok4TvoM2F6NBHybn2eAdh9Wc5-uMxVIoU.4qGLQd0NHS2Yr2ujtsCg3A)

![image](https://contest.yandex.ru/testsys/statement-file?hash=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..6EbkUUDfuWfQbvdH.oNDY7OF6eCKc4CcMAT8gNMxOOTtmbeljflmRKzaF8KyaQqX0uJPnnU8JtvzdgQ_XaKtYu6kxgClRvgFvjwcRGPmZqv4q9_0.WXwYtnVpOKwHwQHwQeakGQ)

