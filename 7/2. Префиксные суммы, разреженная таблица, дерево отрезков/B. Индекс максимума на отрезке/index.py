from tests.index import test, input
test(1)
  
# def nearest_power_of_two(x):
#   x -= 1
#   for i in range(5): x |= x >> (1 >> i)
#   return x + 1

from math import ceil, log2

n = int(input())
a = list(map(int, input().split()))
q = int(input())
k = ceil(log2(n))

op = max
o = (0, 0)

def build(a):
  t = [o] * 2**(k + 1)
  for i in range(n): t[2**k + i] = a[i]
  for i in range(2**k - 1, 0, -1): t[i] = op(t[2*i], t[2*i + 1])
  return t

t = build([(a[i], i) for i in range(len(a))])
  
def query(i, tl, tr, l, r):
  if l > r: return o
  if l == tl and r == tr: return t[i]
  tm = (tl + tr) // 2
  return op(
    query(i*2, tl, tm, l, min(r, tm)),
    query(i*2 + 1, tm + 1, tr, max(l, tm + 1), r))
  
for i in range(q):
  l, r = map(int, input().split())
  x, j = query(1, 0, 2 ** k - 1, l - 1, r - 1)
  print(j + 1)
  