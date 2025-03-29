n = int(input())
a = sorted(map(int, input().split()))

b = [ 10001 ] + [ a[i] - a[i - 1] for i in range(1, n) ] + [ 10001 ]
x, y = 0, 0

for i in b:
  x, y = y, i + min(x, y)

print(x)