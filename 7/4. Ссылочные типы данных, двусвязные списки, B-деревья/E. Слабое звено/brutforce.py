from tests.index import test, input
test(14)

n = int(input())
a = input().split()
# find index of maximum, cos he will be alive at the end in any case
L = max(range(n), key=a.__getitem__)
a = [[int(a[i]), (i + 1) % n, 0] for i in range(n)]

rnd = 1
idle = False
l = L
while True:
  m = a[l][1]
  r = a[m][1]
  
  left, middle, right = a[l][0], a[m][0], a[r][0]
  if left > middle and right > middle and l != r:
    a[m][2] = rnd
    a[l][1] = l = r
    idle = False
  else:
    l = m
    
  if l == L:
    if idle: break
    idle = True
    rnd += 1
  
print(*[i[2] for i in a])