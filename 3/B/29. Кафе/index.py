from tests.index import test, input
test(2)

n = int(input())
a = [ int(input()) for _ in range(n) ]
inf = 888888

dp = [ [ inf ] * (n + 3) for _ in range(n + 1) ]
dp[0][1] = 0

for i in range(1, n + 1):
  for j in range(1, n + 2):
    b, x = dp[i - 1], a[i - 1]
    dp[i][j] = min(b[j + 1], x + b[j - int(x > 100)])

for i in dp:
  print(*i)
  
r, j = inf, 0
for i in range(n + 1, 0, -1):
  if dp[-1][i] < r:
    r, j = dp[-1][i], i

k = j - 1

# восстанавливаем путь
x = r
u = []
for i in range(n - 1, -1, -1):
  if dp[i][j + 1] == x:
    u.append(i + 1)
    j += 1
  elif a[i] > 100:
    j -= 1
  
  x = dp[i][j]


print(r)
print(k, len(u))
for i in u[::-1]: print(i)
