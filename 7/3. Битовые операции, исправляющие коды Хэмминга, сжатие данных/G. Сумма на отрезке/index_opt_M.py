from tests.index import test, input
test(2)

n, k = map(int, input().split())

class FenwickTree:
  def __init__(self, n):
    self.n = n
    self.t = [0] * (n + 1)

  def update(self, i, d):
    while i <= self.n:
      self.t[i] += d
      i += i & -i

  def query(self, i):
    s = 0
    while i > 0:
      s += self.t[i]
      i -= i & -i
    return s

fenwick = FenwickTree(n)
    
for _ in range(k):
  typ, i, j = input().split()
  i, j = int(i), int(j)
  
  if typ == 'A':
    x = fenwick.query(i) - fenwick.query(i - 1)
    fenwick.update(i, j - x)
  elif typ == 'Q':
    print(fenwick.query(j) - fenwick.query(i - 1))