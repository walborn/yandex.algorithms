from tests.index import test, input
test(1)

n = int(input())

balance = {}
for _ in range(n):
  ai, hi, aj, hj = input().split()
  parent = ai, hi
  child = aj, hj

  balance[parent] = balance.get(parent, 0) + 1
  balance[child] = balance.get(child, 0) - 1

def findpath():
  root, leaf = None, None
  for i in balance:
    if balance[i] == 1:
      if root: return -1,
      root = i
    elif balance[i] == -1:
      if leaf: return -1,
      leaf = i
  
  if not root or not leaf: return -1,
  return *root, *leaf

print(*findpath())

def pathfinder(parents, children):
  # root candidate
  root = next(iter(parents))

  visited = set()
  while root in parents:
    # if cycle found than we can't find root
    if root in visited: return -1, 'cant find root'
    visited.add(root)
    root = parents[root]

  def rootfinder(u):
    if u in visited: return
    
  visited = set()
  leaves = set()
  def dfs(u):
    if u in visited: return
    visited.add(u)
    if u not in children: return leaves.add(u)
    for v in children[u]: dfs(v)

  dfs(root)
  # find all leaves that has no children
  # leaves = [ leaf for leaf in leaves if leaf not in children ]
 
  print(balance)
  
  return *root, *leaves[0]
# print(*pathfinder(parents, children))

