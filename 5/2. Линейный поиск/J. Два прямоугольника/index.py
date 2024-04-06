from tests.index import test, input
test(4)

__input__ = input
def input():
  try: return __input__()
  except: return None


n, m = map(int, input().split())
p = [ ['.'] * (m + 2) ] + [ ['.'] + list(input()) + ['.'] for _ in range(n) ] + [ '.' * (m + 2) ]

def solve():
  a = [ () for _ in range(n + 2) ]
  b = [ () for _ in range(m + 2) ]
 
  for i in range(1, n + 2):
    for j in range(1, m + 2):
      if p[i][j - 1] != p[i][j]: a[i] += (j,)
      if p[i - 1][j] != p[i][j]: b[j] += (i,)
  
  if all(len(i) <= 2 for i in a):
    rects = []
    for i in range(1, n + 2):
      if a[i] != a[i - 1]:
        if a[i - 1]: rects[-1] += (i,)
        if a[i]: rects.append(a[i] + (i,))
       
    if len(rects) == 1:
      left, right, top, bottom = rects[0]
      if bottom - top > 1:
        return [ (top, top + 1, left, right), (top + 1, bottom, left, right) ]
      if right - left > 1:
        return [ (top, bottom, left, left + 1), (top, bottom, left + 1, right) ]
          
    if len(rects) == 2: return  [ (top, bottom, left, right) for left, right, top, bottom in rects ]
        
  if all(len(j) <= 2 for j in b):
    rects = []
    for j in range(1, m + 2):
      if b[j] != b[j - 1]:
        if b[j - 1]: rects[-1] += (j,)
        if b[j]: rects.append(b[j] + (j,))


    if len(rects) == 2: return rects

  return False
        

rects = solve()
if not rects: print('NO')
else:
  print('YES')
  
  top, bottom, left, right = rects[0]
  
  for i in range(top, bottom):
    for j in range(left, right):
      p[i][j] = 'a'
  
  top, bottom, left, right = rects[1]
  
  for i in range(top, bottom):
    for j in range(left, right):
      p[i][j] = 'b'

  for i in range(1, n + 1):
    print(*p[i][1:-1], sep='')