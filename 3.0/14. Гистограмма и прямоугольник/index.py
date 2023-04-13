from tests.index import test, input
test(0)


n, *h = map(int, input().split())
a, q = h[:], [ 0 ]
for i in range(1, n):
  while len(q) and a[i] < a[q[-1]]: a[q.pop()] = i
  q.append(i)
for i in q: a[i] = n

b, q = h[::], [ n - 1 ]

for i in range(n - 2, -1, -1):
  while len(q) and b[i] < b[q[-1]]: b[q.pop()] = i + 1
  q.append(i)
for i in q: b[i] = 0

r = 0
for i in range(n):
  s = h[i] * (a[i] - b[i])
  if r < s: r = s

print(r)