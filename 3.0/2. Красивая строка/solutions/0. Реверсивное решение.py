# Реверсивное решение
# Идем не слева направо, а справа налево

from tests.index import test, input
test(1)

K, S = int(input()) + 1, input()
s = '.' + S
n = len(s)

r = 0
for x in set(S):
  i, j, k = n, n, K

  while j and k:
    j -= 1
    k -= int(s[j] != x)
    
  r = max(r, i - j)
  while j:
    i -= 1
    j -= 1
    while s[i] == x: i -= 1
    while s[j] == x: j -= 1
    r = max(r, i - j)

print(r - 1)