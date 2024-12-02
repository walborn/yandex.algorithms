# решается только на движке Python 3.12.3
from tests.index import test, input
test(2)

import sys
sys.setrecursionlimit(200001)

n = int(input())
parents = list(map(lambda i: int(i) - 1, input().split()))
children = [[] for i in range(n)]

for i in range(n - 1):
  children[parents[i]].append(i + 1)

ans = [0] * n
def mining(i):
  descendants = 1
  for j in children[i]:
    jc, jd = mining(j)
    ans[i] += jc + jd
    descendants += jd
  
  ans[i] += 1
  return ans[i], descendants

mining(0)

print(*ans)

