from tests.test import test, input
test(3)
 
w, h, n = map(int, input().split())

tiles = dict()
for _ in range(n):
  x, y = map(int, input().split())
  if not (y in tiles): tiles[y] = []
  tiles[y].append(x)

a = [w]
b = [1]
c = [w]
d = [1]

i = 0

while a[i] and i < h:
  i += 1
  if i in tiles:
    a.append(min(a[-1], min(tiles[i]) - 1))
  else:
    a.append(a[-1])

i = 0
while b[i] <= w and i < h:
  i += 1
  if i in tiles:
    b.append(max(b[-1], max(tiles[i]) + 1))
  else:
    b.append(b[-1])

i = h + 1
while c[-1] and i > 1:
  i -= 1
  if i in tiles:
    c.append(min(c[-1], min(tiles[i]) - 1))
  else:
    c.append(c[-1])

i = h + 1
while d[-1] and i > 1:
  i -= 1
  if i in tiles:
    d.append(max(d[-1], max(tiles[i]) + 1))
  else:
    d.append(d[-1])


ans = min(w, h) - 1

def check(i, j, width):
  x = ( i, j )
  y = ( i, j + width + 1 )
  z = ( h + 1 - (i + width + 1), j )
  t = ( h + 1 - (i + width + 1), j + width + 1 )

  if len(a) <= x[0] or a[x[0]] < x[1]: return False
  if len(b) <= y[0] or b[y[0]] > y[1]: return False
  if len(c) <= z[0] or c[z[0]] < z[1]: return False
  if len(d) <= t[0] or d[t[0]] > t[1]: return False
  return True

i = 0
while i < h - ans:
  m = a[i] if i < len(a) else 0
  for j in range(m + 1):
    while check(i, j, ans) and ans:
      ans -= 1
  i += 1
print(ans + 1)


