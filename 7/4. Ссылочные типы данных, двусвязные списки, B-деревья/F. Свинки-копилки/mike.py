n = int(input())
where = [0] + [int(input()) for _ in range(n)]
mark = [0] * (n + 1)
ans = 0
for i in range(1, n + 1):
  if mark[i] == 0:
    j = i
    while mark[j] == 0:
      mark[j] = i
      j = where[j]
    if mark[j] == i:
      ans += 1
print(ans)