from tests.index import test, input
test(1)

n = int(input())

class FenwickTree:
  def __init__(self, n):
    self.n = n
    self.t = [[[0] * (n + 1) for _ in range(n + 1)] for _ in range(n + 1)]

  def update(self, x, y, z, d):
    i = x
    while i <= self.n:
      j = y
      while j <= self.n:
        k = z
        while k <= self.n:
          self.t[i][j][k] += d
          k += k & -k
        j += j & -j
      i += i & -i  
        
  def query(self, x, y, z):
    s = 0
    i = x
    while i > 0:
      j = y
      while j > 0:
        k = z
        while k > 0:
          s += self.t[i][j][k]
          k -= k & -k
        j -= j & -j
      i -= i & -i  
    return s
  
  def query_range(self, xl, yl, zl, xr, yr, zr):
    if xl > xr or yl > yr or zl > zr:
      return 0

    result = self.query(xr, yr, zr)
    if xl > 1:
      result -= self.query(xl - 1, yr, zr)
    if yl > 1:
      result -= self.query(xr, yl - 1, zr)
    if zl > 1:
      result -= self.query(xr, yr, zl - 1)
    if xl > 1 and yl > 1:
      result += self.query(xl - 1, yl - 1, zr)
    if xl > 1 and zl > 1:
      result += self.query(xl - 1, yr, zl - 1)
    if yl > 1 and zl > 1:
      result += self.query(xr, yl - 1, zl - 1)
    if xl > 1 and yl > 1 and zl > 1:
      result -= self.query(xl - 1, yl - 1, zl - 1)
    return result
  
fenwick = FenwickTree(n)
    
while (inp:=input()) != '3':
  typ = int(inp[0])
  if typ == 1:
    x, y, z, k = map(int, inp[2:].split())
    fenwick.update(x + 1, y + 1, z + 1, k)
  elif typ == 2:
    xl, yl, zl, xr, yr, zr = map(lambda i: int(i) + 1, inp[2:].split())
    print(fenwick.query_range(xl, yl, zl, xr, yr, zr))

