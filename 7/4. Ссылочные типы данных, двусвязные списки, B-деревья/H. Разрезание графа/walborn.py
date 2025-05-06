from tests.index import test, input
test(1)

class DSU:
  def __init__(self, n):
    self.parents = list(range(n))
    self.rank = [0] * n

  def find(self, x):
    # Поиск представителя компоненты с сжатием путей
    if self.parents[x] != x:
      self.parents[x] = self.find(self.parents[x])
    return self.parents[x]
  
  def union(self, x, y):
    # Объединение двух компонент по рангу
    px, py = self.find(x), self.find(y)
    # Если родители одинаковые, то ничего не надо делать
    if px == py: return False
    
    if self.rank[px] < self.rank[py]: px, py = py, px
    self.parents[py] = px
    
    if self.rank[px] == self.rank[py]:
      self.rank[px] += 1
      
    return True

  
n, m, k = map(int, input().split())
# skip the init, because we will go back from the last request
for _ in range(m): input()

a = [input().split() for _ in range(k)][::-1]

ans = []
dsu = DSU(n + 1)

for cmd, u, v in a:
  u, v = int(u), int(v)
  
  if cmd == 'ask':
    ans.append('YES' if dsu.find(u) == dsu.find(v) else 'NO')
  else:
    dsu.union(u, v)
  
    
print('\n'.join(ans[::-1]))   