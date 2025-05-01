from tests.index import test, input
test(10)
from time import time
start_time = time()

# import sys
# input = sys.stdin.readline

# Класс для структуры данных Union-Find (DSU)
class DSU:
  def __init__(self, n):
    self.parents = list(range(n))
    self.rank = [0] * n

  def find(self, x):
    # Поиск представителя компоненты с сжатием путей
    if self.parent[x] != x:
      self.parent[x] = self.find(self.parent[x])
    return self.parent[x]
  

  # итеративный аналог
  # def find(self, x):
  #   root = x
  #   while self.parent[root] != root: root = self.parent[root]
  #   while x != root: x, self.parent[x] = self.parent[x], root
  #   return root
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

# Чтение входных данных
n, m, k = map(int, input().split())
# Пропускаем описание начальных рёбер, так как идем в обратном порядке
for _ in range(m): input()

# Чтение запросов
queries = [input().split() for _ in range(k)]

# Инициализация DSU
dsu = DSU(n)
# Список для хранения ответов на запросы "ask"
ans = []

# Обработка запросов в обратном порядке
for query in reversed(queries):
  cmd, u, v = query
  u, v = int(u) - 1, int(v) - 1  # Переводим в 0-based индексы

  if cmd == 'ask':
    # Проверяем, принадлежат ли вершины одной компоненте
    ans.append('YES' if dsu.find(u) == dsu.find(v) else 'NO')
  elif cmd == 'cut':
    # "cut" в обратном порядке — это соединение вершин
    dsu.union(u, v)

# Вывод ответов в правильном порядке
print('\n'.join(reversed(ans)))

print(time() - start_time)
