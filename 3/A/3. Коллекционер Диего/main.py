n, a = int(input()), sorted(set(map(int, input().split())))
k, p = int(input()), list(map(int, input().split()))

j, b = 0, sorted(enumerate(p), key=lambda i: i[1])

for i in range(n):
  while j < k and a[i] >= b[j][1]:
    p[b[j][0]], j = i, j + 1

for i in range(j, k): p[b[i][0]] = n
for i in p: print(i)