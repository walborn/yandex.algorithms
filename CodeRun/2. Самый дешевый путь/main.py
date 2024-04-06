n, m = map(int, input().split())
a = [list(map(int, input().split())) for i in range(n)]

for i in range(1, n): a[i][0] += a[i-1][0]
for j in range(1, m): a[0][j] += a[0][j-1]
for i in range(1, n):
  for j in range(1, m):
    a[i][j] += min(a[i-1][j], a[i][j-1])

print(a[-1][-1])