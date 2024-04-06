from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None

n = int(input())
minX, minY = map(int, input().split())
maxX, maxY = minX, minY

for i in range(n - 1):
  x, y = map(int, input().split())
  if x > maxX:
    maxX = x
  elif x < minX:
    minX = x
    
  if y > maxY:
    maxY = y
  elif y < minY:
    minY = y
    
print(minX, minY, maxX, maxY)


