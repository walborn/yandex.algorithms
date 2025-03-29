# Самое короткое решение, но не проходит ML
from tests.index import test, input
test(1)

k, s = int(input()) + 1, input()
n = len(s)

r, a = 0, [ -1, n ]
for x in set(s):
  a[1:-1] = [ i for i in range(n) if s[i] != x ]
  r = max(r, *[a[i] - a[i - k] for i in range(k, len(a))])

print(r - 1)