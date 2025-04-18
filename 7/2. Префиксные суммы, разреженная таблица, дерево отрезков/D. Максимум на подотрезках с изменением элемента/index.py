from tests.index import test, input
test(1)

from math import ceil, log2

n = int(input())
a = list(map(int, input().split()))
q = int(input())
k = ceil(log2(n))

op = max
o = 0

def build(a):
  t = [o] * 2**(k + 1)
  for i in range(n): t[2**k + i] = a[i]
  for i in range(2**k - 1, 0, -1): t[i] = op(t[2*i], t[2*i + 1])
  return t

t = build(a)
  
def query(i, tl, tr, l, r):
  if l > r: return o
  if l == tl and r == tr: return t[i]
  tm = (tl + tr) // 2
  return op(
    query(i*2, tl, tm, l, min(r, tm)),
    query(i*2 + 1, tm + 1, tr, max(l, tm + 1), r))

def update(i, x, j = 1, l = 0, r = 2**k - 1):
  if l == r:
    t[j] = x
  else:
    m = (l+r) // 2
    if i <= m: update(i, x, 2*j, l, m)
    else: update(i, x, 2*j+1, m+1, r)
    t[j] = op(t[2*j], t[2*j+1])

for i in range(q):
  x, y, z = input().split()
  y = int(y)
  z = int(z)
  if x == 's':
    value = query(1, 0, 2 ** k - 1, y - 1, z - 1)
    print(value, end=' ')
  if x == 'u':
    update(y - 1, z)
  