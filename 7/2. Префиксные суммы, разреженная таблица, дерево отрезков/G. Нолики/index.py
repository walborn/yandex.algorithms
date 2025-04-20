from tests.index import test, input
test(3)

from math import ceil, log2

n = int(input())
a = list(map(int, input().split()))
b = a[:]
m = int(input())

k = ceil(log2(n))
def op(x, y):
  xlongest, xprefix, xsuffix, xonly0s = x
  ylongest, yprefix, ysuffix, yonly0s = y
  
  longest = max(xlongest, ylongest, xsuffix + yprefix)
  
  prefix = xprefix
  if xonly0s: prefix += yprefix
  
  suffix = ysuffix
  if yonly0s: suffix += xsuffix
  
  
  return (longest, prefix, suffix, xonly0s and yonly0s)
  
o = (0, 0, 0, False) # longest 0s,  prefix 0s, suffix 0s, only 0s
def modify(x):
  if x == 0: return (1, 1, 1, True)
  return (0, 0, 0, False)


def build(a):
  t = [o] * 2**(k + 1)
  for i in range(n): t[2**k + i] = a[i]
  for i in range(2**k - 1, 0, -1): t[i] = op(t[2*i], t[2*i + 1])
  return t

t = build([modify(i) for i in a])

def query(l, r, node = (1, 0, 2**k - 1)):
  if l > r: return o

  i, tl, tr = node
  if l == tl and r == tr: return t[i]
  m = (tl + tr) // 2
  
  i *= 2
  return op(
    query(l, min(m, r), (i, tl, m)),
    query(max(l, m + 1), r, (i + 1, m + 1, tr))
  )


def update(i, x):
  i += 2**k
  if t[i][0] == int(x == 0): return
  
  print(x + x, modify(x))
  t[i] = modify(x)
  print(t[i], x)
  while i := i//2:
    t[i] = op(t[2*i], t[2*i+1])

for _ in range(m):
  typ, i, j = input().split()
  
  if typ == 'QUERY':
    l, r = int(i) - 1, int(j) - 1
    print(query(l, r)[0])
    print('brut', sum([int(i == 0) for i in b[l:r + 1]]))
  else: # typ == 'UPDATE'
    i, x = int(i) - 1, int(j)
    update(i, x)
    b[i] = x
    print('check update', int(b[i] == 0) == t[2**k + i][0], i, b[i], t[2**k + i])
    