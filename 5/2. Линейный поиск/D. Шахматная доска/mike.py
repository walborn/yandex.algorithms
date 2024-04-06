from tests.index import test, input
test(1)

__input__ = input
def input():
  try: return __input__()
  except: return None

n = int(input())

board = [ [ True ] * 10 for _ in range(10) ]
for _ in range(n):
  x, y = map(int, input().split())
  board[x][y] = False
  

p = 0
for x in range(1, 10):
  for y in range(1, 10):
    p += int(board[x][y - 1] != board[x][y])
    p += int(board[x - 1][y] != board[x][y])
  
print(p)


