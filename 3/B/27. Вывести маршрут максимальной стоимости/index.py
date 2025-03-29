n, m = map(int, input().split())

a = [ list(map(int, input().split())) for _ in range(n)]
for i in range(1, m):
  a[0][i] += a[0][i - 1]

for j in range(1, n):
  a[j][0] += a[j - 1][0]

for i in range(1, n):
  for j in range(1, m):
    a[i][j] += max(a[i - 1][j], a[i][j - 1])

print(a[-1][-1])

i, j, r = n - 1, m - 1, ''
while True:
  if i == 0:
    r = 'R ' * j + r
    break
  elif j == 0:
    r = 'D ' * i + r
    break
  elif a[i - 1][j] < a[i][j - 1]:
    r = 'R ' + r
    j -= 1
  else:
    r = 'D ' + r
    i -= 1
print(r)