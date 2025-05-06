from tests.index import test, input
test(14)

n = int(input())
where = [0] + [int(input()) for _ in range(n)]
islands = {}
ans = 0
for i in range(1, n + 1):
  if i in islands: continue
  
  island = i
  while i not in islands:
    islands[i], i = island, where[i]
  
  if islands[i] == island:
    ans += 1
print(ans)