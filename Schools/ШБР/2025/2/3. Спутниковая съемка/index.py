from tests.index import test, input
test(1)

w, h = map(int, input().split())

a = [[(0, (0, 0))] * (h + 2) for _ in range(w + 2)]
n = int(input())

prev = (1, 1, w, h)

for step in range(n):
  xl, yl, xr, yr = map(int, input().split())
  
  for i in range(max(xl, prev[0] - 1), min(xr, prev[2] + 1) + 1):
    for j in range(max(yl, prev[1] - 1), min(yr, prev[3] + 1) + 1):
      if a[i - 1][j][0] == step:
        a[i][j] = (step + 1, (i - 1, j))
      elif a[i][j - 1][0] == step:
        a[i][j] = (step + 1, (i, j - 1))
      elif a[i + 1][j][0] == step:
        a[i][j] = (step + 1, (i + 1, j))
      elif a[i][j + 1][0] == step:
        a[i][j] = (step + 1, (i, j + 1))

  prev = (xl, yl, xr, yr)

def ans():
  for i in range(1, w + 1):
    for j in range(1, h + 1):
      if a[i][j][0] == n:
        return 'YES'
  
  return 'NO'
  
print(ans())

