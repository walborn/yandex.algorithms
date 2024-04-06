from tests.index import test, input
test(1)

__input__ = input
def input():
  try: return __input__()
  except: return None


n, m = map(int, input().split())

board = [ list(map(int, input().split())) for _ in range(n) ]

def xross():
  a, b, c = (0, 0, 0), (0, 0, 0), (0, 0, 0)
  for i in range(n):
    for j in range(m):
      x = board[i][j]
      if x > a[0]:
        a, b, c = (x, i, j), a, b
      elif x > b[0]:
        b, c = (x, i, j), b
      elif x > c[0]:
        c = (x, i, j)
        

  ay, ax = a[1], a[2]
  by, bx = b[1], b[2]
  cy, cx = c[1], c[2]
      
  if ax == bx and ax == cx:
    maxim, y = 0, 0
    for i in range(n):
      for j in range(m):
        if j == ax: continue
        if board[i][j] > maxim:
          maxim, y = board[i][j], i
    return (ax, y)
  
  if ay == by and ay == cy:
    maxim, x = 0, 0
    for i in range(n):
      if i == ay: continue
      for j in range(m):
        if board[i][j] > maxim:
          maxim, x = board[i][j], j
    return (x, ay)
  
    # если только две лежат на одной горизонтали
  if ax == bx: return (ax, cy)
  if ax == cx: return (ax, by)
  if bx == cx: return (bx, ay)
  # если только две лежат на одной вертикали
  if ay == by: return (cx, ay)
  if ay == cy: return (bx, ay)
  if by == cy: return (ax, by)
  # все три на разных вертикалях и горизонталях
  return (ax, by)
      
x, y = xross()  
print(y + 1, x + 1)