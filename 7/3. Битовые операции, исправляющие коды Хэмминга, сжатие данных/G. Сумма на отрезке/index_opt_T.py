from tests.index import test, input
test(2)

n, k = map(int, input().split())

class FenwickTree:
  def __init__(self, n):
    self.n = n
    self.t = [0] * (n + 1)
    self.a = [0] * (n + 1) # нужно для расчета разницы

  def update(self, i, x):
    d = x - self.a[i]
    self.a[i] = x
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
  
  if typ == 'A':
    i, x = int(i), int(j)
    fenwick.update(i, x)
  elif typ == 'Q':
    l, r = int(i), int(j)
    print(fenwick.query(r) - fenwick.query(l - 1))