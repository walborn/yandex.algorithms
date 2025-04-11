from tests.index import test, input
test(3)
  

n, k = map(int, input().split())
bricks = [[] for _ in range(k)]

for i in range(n):
  w, j = map(int, input().split())
  bricks[j - 1].append(w)
  
width = sum(bricks[0])
a = [True] * (width + 1)

d = []
for lens in bricks:
  b = [0] + [-1] * width
  for w in lens:
    for i in range(width - w, -1, -1):
      if b[i] != -1 and b[i + w] == -1:
        b[i + w] = w
  print(*b)
  a = [i and j != -1 for i, j in zip(a, b)]
  d.append(b)

    
for i in range(1, width + 1):
  if a[i]:
    print('YES')
    print(i)
    for 
    print(*d)
    break
else:
  print('NO')