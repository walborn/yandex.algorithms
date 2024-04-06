from tests.index import test, input
test(0)

n, k = map(int, input().split())
l = [0] + list(map(int, input().split())) + [n]

a = [[0]*(k + 2) for _ in range(k + 1)]
inf = n * k

for m in range(2, k + 2):
  for i in range(k + 2 - m):
    L = l[i+m] - l[i]
    a[i][i+m] = inf
    for j in range(1, m):
      a[i][i+m] = min(a[i][i+m], a[i][i+j] + a[i+j][i+m])
    a[i][i + m] += L

print(a[0][k + 1])