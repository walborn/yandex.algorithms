fin = open('input.txt', 'r')
n = int(fin.readlines())

a, b, h, maxDown, maxUp = 0, 0, 0, 0, 0
pos, neg = [], []

for i in range(1, n + 1):
  up, down = map(int, fin.readlines().split())
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

fin.close()
