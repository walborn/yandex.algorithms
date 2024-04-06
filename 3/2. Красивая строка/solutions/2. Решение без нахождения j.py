# Пропускаем шаг поиска начального j 
# идея та же самая, что и в основном решении, но мы добавляем k + 1 фейковыx символа
# это означает, что на строке s[:k] точно выполняется условие и можно инициализировать
# j сразу в k позицию 

from tests.index import test, input
test(3)

k, S = int(input()), input()
s = '.' * (k + 1) + S + '.'
n = len(s)

r = 0
for x in set(S):
  i, j = -1, k
  while j < n - 1:
    i += 1
    j += 1
    while s[i] == x: i += 1
    while s[j] == x: j += 1
    r = max(r, j - i)

print(r - 1)