# Класс для структуры данных Union-Find (DSU)
class DSU:
  def __init__(self, n):
    self.parents = list(range(n))
    self.rank = [0] * n

  def find(self, x):
    # Поиск представителя компоненты с сжатием путей
    if self.parents[x] != x:
      self.parents[x] = self.find(self.parents[x])
    return self.parents[x]
  

  # итеративный аналог
  def find_iter(self, x):
    root = x
    while self.parents[root] != root: root = self.parents[root]
    while x != root: x, self.parents[x] = self.parents[x], root
    return root
  
  def union(self, x, y):
    # Объединение двух компонент по рангу
    px, py = self.find(x), self.find(y)
    # Если родители одинаковые, то ничего не надо делать
    if px == py: return False
    
    if self.rank[px] < self.rank[py]:
      self.parents[px] = py
    elif self.rank[px] > self.rank[py]:
      self.parents[py] = px
    else:
      self.parents[py] = px
      self.rank[px] += 1
    return True
