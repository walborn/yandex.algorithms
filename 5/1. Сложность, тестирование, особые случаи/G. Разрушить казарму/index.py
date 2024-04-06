# A. Не минимум на отрезке
from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None

from collections import deque

x = int(input())
z = int(input())
p = int(input())


memo = dict()

def bfs(x, y, z):
  q = deque([(x, y, z, 0)])
  visited = set()

  while q:
    x, y, z, r = q.popleft()
    if x <= 0 or y > 1.618 * x: continue
    r += 1
    if x >= y + z: return r
    
    if (x, y, z) in visited: continue
    visited.add((x, y, z))
    
    d = x - y
    if d not in memo or memo[d] > z:
      memo[d] = z
    else:
      continue
    
    # 1. максимум в бойцов     
    if x <= y:
      q.append((2 * x - y, y - x + p, z, r))
    else:
      q.append((x, p, z - x + y, r))
      
    # 2. максимум в казарму
    if x < z:
      q.append((x - y, y + p, z - x, r))
    else:
      q.append((2 * x - y - z, y - x + z, 0, r))

  return -1



print(bfs(x, 0, z))
