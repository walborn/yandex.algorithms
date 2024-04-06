from tests.test import test, input
test(9)
 
def waterright(now, ynow):
  poly = [[x[now], ynow], [x[now], y[now]]]

  j = now + 1
  while j < n + 2:
    if y[j] > ynow:
      break
    poly.append([x[j], y[j]])
    j += 1

  lastx = x[j - 1] + (x[j] - x[j - 1]) * (ynow - y[j - 1]) / (y[j] - y[j - 1])
  poly.append([lastx, ynow])
  poly.append([x[now], ynow])
  square = 0

  for i in range(len(poly) - 1):
    square += poly[i][0] * poly[i + 1][1] - poly[i][1] * poly[i + 1][0]
  square = abs(square) / 2
  water = (x[j] - x[now]) * h + sufadd[j]
  return water - square

def waterleft(now, ynow):
  poly = [[x[now], ynow], [x[now], y[now]]]

  j = now - 1
  while j >= 0:
    if y[j] > ynow:
      break
    poly.append([x[j], y[j]])
    j -= 1
  
  lastx = x[j + 1] + (x[j + 1] - x[j]) * (y[j + 1] - ynow) / (y[j] - y[j + 1])

  poly.append([lastx, ynow])
  poly.append([x[now], ynow])
  square = 0

  for i in range(len(poly) - 1):
    square += poly[i][0] * poly[i + 1][1] - poly[i][1] * poly[i + 1][0]
  square = abs(square) / 2
  water = (x[now] - x[j]) * h + prefadd[j]
  return water - square

def check(m):
  for i in range(1, n + 1):
    if y[i - 1] > y[i] and y[i] < y[i + 1]:
      square = waterleft(i, y[i] + m) + waterright(i, y[i] + m)
      if square >= 0:
        return True
  return False

n, h = input().split()
n = int(n) + 1
h = float(h)

x = []
y = []

for _ in range(n):
  a, b = map(int, input().split())
  x.append(a)
  y.append(b)

x = [x[0]] + x + [x[-1]]
y = [10 ** 10] + y + [10 ** 10]

sufadd = [0] * (n + 2)
for i in range(n, 0, -1):
  sufadd[i] = max(0, waterright(i, y[i]))

prefadd = [0] * (n + 2)
for i in range(1, n + 1):
  prefadd[i] = max(0, waterleft(i, y[i]))

l = 0
r = 10 ** 10

while r - l > 0.000001:
  m = (l + r) / 2
  if check(m):
    l = m
  else:
    r = m

print(l)