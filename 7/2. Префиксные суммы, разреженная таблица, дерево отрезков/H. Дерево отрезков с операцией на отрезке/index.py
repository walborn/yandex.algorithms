from tests.index import test, input
test(1)

from math import ceil, log2

n = int(input())
a = list(map(int, input().split()))
m = int(input())

k = ceil(log2(n))

def op(x, y): return [max(x[0], y[0]), 0]
o = [0, 0]

def build(a):
  t = [o] * 2**(k + 1)
  for i in range(n): t[2**k + i] = a[i]
  for i in range(2**k - 1, 0, -1): t[i] = op(t[2*i], t[2*i + 1])
  return t

t = build([[i, 0] for i in a])

def get(j, node = (1, 0, 2**k - 1)):
  i, l, r = node
  v, x = t[i]
  t[i] = [v + x, 0]
  if i >= 2**k: return t[i][0]
  
  i *= 2
  m = (l + r) // 2
  t[i][1] += x
  t[i + 1][1] += x
  
  node = (i + 1, m + 1, r) if j > m else (i, l, m)
  return get(j, node)

def add(l, r, x, node = (1, 0, 2**k - 1)):
  i, tl, tr = node
  if l > r: return
  if l == tl and r == tr:
    t[i][1] += x
  else:
    m = (tl + tr) // 2
    i *= 2
    add(l, min(m, r), x, (i, tl, m))
    add(max(l, m + 1), r, x, (i + 1, m + 1, tr))

for _ in range(m):
  inp = input()
  
  if inp[0] == 'g': # get
    i = int(inp[2:]) - 1
    print(get(i))
  else: # add
    l, r, x = map(int, inp[2:].split()) 
    add(l - 1, r - 1, x)
    