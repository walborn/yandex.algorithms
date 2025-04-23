from tests.index import test, input
test(2)
def printTree(t):
  i = 0
  while (2**i < len(t)):
    print(t[1<<i:1<<(i:=i+1)])
    
from math import ceil, log2

n = int(input())
a = list(map(int, input().split()))
m = int(input())

k = ceil(log2(n))

def op(x, y): return [max(sum(x), sum(y)), 0]
o = [0, 0]

def build(a):
  t = [o] * 2**(k + 1)
  for i in range(n): t[2**k + i] = a[i]
  for i in range(2**k - 1, 0, -1): t[i] = op(t[2*i], t[2*i + 1])
  return t

t = build([[i, 0] for i in a])

def query(l, r, node = (1, 0, 2**k - 1)):
  i, tl, tr = node
  v, x = t[i]
  if l > r: return o
  if l == tl and r == tr: return t[i]
  
  t[i] = [v + x, 0]
  i *= 2
  t[i][1] += x
  t[i + 1][1] += x
  
  tm = (tl + tr) // 2
  
  return op(
    query(l, min(tm, r), (i, tl, tm)),
    query(max(l, tm + 1), r, (i + 1, tm + 1, tr))
  )

def add(l, r, x, node = (1, 0, 2**k - 1)):
  i, tl, tr = node
  if l > r: return
  
  if l == tl and r == tr:
    t[i][1] += x
    update(i)
    return
  
  v, dv = t[i]
  t[i] = [v + dv, 0]
  i *= 2
  t[i][1] += dv
  t[i+1][1] += dv
  
  tm = (tl + tr) // 2
  add(l, min(tm, r), x, (i, tl, tm))
  add(max(l, tm + 1), r, x, (i + 1, tm + 1, tr))

def update(i):
  while i := i//2:
    t[i] = op(t[2*i], t[2*i+1])
    
for _ in range(m):
  inp = input()
  
  if inp[0] == 'm': # get max
    l, r = map(int, inp[2:].split())
    print(sum(query(l - 1, r - 1)), end=' ')
    
  else: # add
    l, r, x = map(int, inp[2:].split()) 
    add(l - 1, r - 1, x)
    
