from tests.index import test, input
test(1)

__input__ = input
def input():
  try: return __input__()
  except: return None

n = int(input())

board = [ [ True ] * 10 for _ in range(10) ]
for i in range(n):
  x, y = map(int, input().split())
  board[x][y] = False
  
p = 0
for x in range(1, 9):
  for y in range(1, 9):
    if board[x][y]: continue
    for i, j in ((1, 0), (0, 1), (-1, 0), (0, -1)):
      p += int(board[x + i][y + j])
  
print(p)

for x in range(1, 10):
  for y in range(1, 10):
    p += int(board[x][y - 1] != board[x][y])
    p += int(board[x - 1][y] != board[x][y])
    


