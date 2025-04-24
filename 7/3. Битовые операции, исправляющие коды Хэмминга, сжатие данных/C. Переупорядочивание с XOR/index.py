from tests.index import test, input
test(1)

n = int(input())
length = 0
a = []
for i in map(int, input().split()):
  x = 0
  l = 0
  while i:
    if i & 1: x += 1
    i >>= 1
    l += 1
    
  length = max(length, l)
  a.append(x)
  print(x, end=' ')

if sum(a) % 2 or 2 * max(a) > sum(a): print('impossible')
else:
  b = a[:]
  x, y = 0, 0
  ix, iy = -1, -1
  for i in range(sum(a) // 2):
    if a[i] >= x:
      x, y, ix, iy = a[i], x, i, ix
    elif a[i] > y:
      y, iy = a[i], i
  
  b[ix] = b[ix] * 1
  b[iy] ^= 1
  
  print(x, y, ix, iy)
  
  
  def rec(a):
    