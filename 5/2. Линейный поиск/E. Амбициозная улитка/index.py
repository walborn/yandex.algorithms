from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None

  
n = int(input())

a, b, h, maxDown, maxUp = 0, 0, 0, 0, 0
pos, neg = [], []

for i in range(1, n + 1):
  up, down = map(int, input().split())
  if up > down:
    if down > maxDown:
      maxDown, a, posA = down, i, len(pos)
    h += up - down
    pos.append(i)
    
  else:
    if up > maxUp:
      maxUp, b, negB = up, i, len(neg)
    neg.append(i)
    
  
if maxDown > maxUp:
  h += maxDown
  pos[-1], pos[posA] = pos[posA], pos[-1]
else:
  h += maxUp
  neg[0], neg[negB] = neg[negB], neg[0]
   
print(h)
print(*(pos + neg))

