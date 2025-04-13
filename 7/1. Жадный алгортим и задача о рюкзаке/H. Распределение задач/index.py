# нужно выбирать PyPy иначе не проходит по времени
from tests.index import test, input
test(4)

n = int(input())

odd, even = [], []

for _ in range(n): 
  s = input()
  l = len(s)
  
  a = sum(1 for i in range(0, l, 2) if s[i] == 'S')
  b = sum(1 for i in range(1, l, 2) if s[i] == 'S')

  if l % 2: odd.append((a, b))
  else: even.append((a, b))

ans = 0
r = len(odd)
if r:
  ans = sum(max(a, b) for a, b in even)
  odd.sort(key = lambda a: a[1] - a[0])
  m = (r + 1) // 2
  for i in range(m): ans += odd[i][0]
  for i in range(m, r): ans += odd[i][1]
else:
  ans = sum(a for a, _ in even)

print(ans)