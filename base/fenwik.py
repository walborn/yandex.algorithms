class FenwickTree:
  def __init__(self, n):
    self.n = n
    self.t = [0] * (n + 1)

  def update(self, i, x):
    while i <= self.n:
      self.t[i] += x
      i += i & -i

  def query(self, i):
    s = 0
    while i > 0:
      s += self.t[i]
      i -= i & -i
    return s