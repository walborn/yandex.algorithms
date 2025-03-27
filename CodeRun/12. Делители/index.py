from tests.index import test, input
test(3)
  
n = int(input())

ans = 0
maxim = 0

if n == 1: ans, maxim = 1, -1
if n == 2: ans, maxim = 2, 0

d = {}

m = (n + 1) // 2
for i in range(2, m + 1):
  for j in range((m // i) * i, n + 1, i):
    d[j] = d.get(j, 0) + 1
     
for i in range(n, n // 2, -1):
  if i in d and d[i] > maxim:
    maxim = d[i]
    ans = i

print(ans)
print(maxim + 2)