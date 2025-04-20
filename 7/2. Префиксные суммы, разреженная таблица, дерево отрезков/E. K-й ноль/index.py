from tests.index import test, input
test(1)

from math import ceil, log2

n = int(input())
a = list(map(int, input().split()))
m = int(input())
k = ceil(log2(n))

def op(x, y): return x + y
# нейтральное значение
o = 0

def build(a):
  t = [o] * 2**(k + 1)
  for i in range(n): t[2**k + i] = a[i]
  for i in range(2**k - 1, 0, -1): t[i] = op(t[2*i], t[2*i + 1])
  return t

t = build([int(i == 0) for i in a])

def query(j, i = 1):
  if i >= 2**k: return i - 2**k
  i *= 2
  l = t[i]
  if j > l: i, j = i + 1, j - l
  return query(j, i)

def pref(r, tl = 0, tr = 2**k - 1, i = 1):
  if r < 0: return 0
  if r >= tr: return t[i]
  tm = (tl + tr) // 2
  i *= 2
  if r <= tm: return pref(r, tl, tm, i)
  return t[i] + pref(r, tm, tr, i + 1)

def update(i, x):
  i += 2**k
  # do nothing if x doesn't change t[i]
  if x and not t[i]: return
  if not x and t[i]: return
  
  t[i] = int(x == 0)
  
  while i := i//2:
    t[i] = op(t[2*i], t[2*i+1])

for _ in range(m):
  action, *args = input().split()
  if action == 's':
    l, r, j = map(int, args)
    pl = pref(l - 2)
    pr = pref(r - 1)
    print((l, r), (pl, pr), j)
    if pr - pl < j: print(-1)
    else: print(query(j + pl) + 1)
  else:
    i, x = map(int, args)
    update(i - 1, x)