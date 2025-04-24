from tests.index import test, input
test(2)

n = int(input())

for i in range(n):
  x = 0
  for j in map(int, input().split()):
    x |= j
  print(x, end=' ')
