n = int(input())
a = sorted(map(int, input().split()))

x = [a[i + 1] - a[i] for i in range(n - 1)]

u = 100000
v = x[0]

for i in range(1, n - 1):
  u, v = v, x[i] + min(u, v)

print(v)