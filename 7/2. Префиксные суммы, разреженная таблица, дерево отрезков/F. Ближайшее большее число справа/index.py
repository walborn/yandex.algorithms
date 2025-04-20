from tests.index import test, input
test(2)

from math import ceil, log2

n, m = map(int, input().split())
a = list(map(int, input().split()))

k = ceil(log2(n))
op = max
o = 0

def build(a):
  t = [o] * 2**(k + 1)
  for i in range(n): t[2**k + i] = a[i]
  for i in range(2**k - 1, 0, -1): t[i] = op(t[2*i], t[2*i + 1])
  return t

t = build(a)
def query(j, x, node = (1, 0, 2**k - 1)):
  i, l, r = node
  if t[i] < x: return 0
  if i >= 2**k:
    return i - 2**k + 1
  i *= 2
  m = (l + r) // 2
  if j > m: return query(j, x, (i + 1, m + 1, r))
  return query(j, x, (i, l, m)) or query(j, x, (i + 1, m + 1, r))

def update(i, x):
  i += 2**k
  t[i] = x
  
  while i := i//2:
    t[i] = op(t[2*i], t[2*i+1])

for _ in range(m):
  typ, i, x = map(int, input().split())
  
  if typ: # t == 1
    if x > t[1]: print(-1)
    else: print(query(i - 1, x) or -1)
  else: # t == 0
   update(i - 1, x)