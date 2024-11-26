# A. Не минимум на отрезке
from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None


h = set()
v = set()

r, b = [], []

chess = [[0] * 8 for _ in range(8)]

for i in range(8):
  row = input()
  for j in range(8):
    if row[j] == 'R':
      r.append((i, j))
      chess[i][j] = 2
    elif row[j] == 'B':
      b.append((i, j))
      chess[i][j] = 2
      
for i, j in r:
  for x in range(j + 1, 8):
    if chess[i][x] != 2: chess[i][x] = 1
    else: break
  for x in range(j - 1, -1, -1):
    if chess[i][x] != 2: chess[i][x] = 1
    else: break
  for y in range(i + 1, 8):
    if chess[y][j] != 2: chess[y][j] = 1
    else: break
  for y in range(i - 1, -1, -1):
    if chess[y][j] != 2: chess[y][j] = 1
    else: break
    
    
for i, j in b:
  y, x = i + 1, j + 1
  while x < 8 and y < 8:
    if chess[y][x] != 2: chess[y][x] = 1
    else: break
    x += 1
    y += 1
  
  y, x = i - 1, j - 1
  while x >= 0 and y >= 0:
    if chess[y][x] != 2: chess[y][x] = 1
    else: break
    x -= 1
    y -= 1
    
  y, x = i - 1, j + 1
  while x < 8 and y >= 0:
    if chess[y][x] != 2: chess[y][x] = 1
    else: break
    x += 1
    y -= 1
    
  y, x = i + 1, j - 1
  while x >= 0 and y < 8:
    if chess[y][x] != 2: chess[y][x] = 1
    else: break
    x -= 1
    y += 1
  
  
x = 0
for i in range(8):
  for j in range(8):
    if chess[i][j] == 0:
      x += 1
    if chess[i][j] == 1:
      print(i, j)


print(x)