from tests.index import test, input
test(1)
  

n, m = map(int, input().split())
a = [ i for i in map(int, input().split()) if i <= m ]

b = [True] + [False] * m
    
for x in a:
  for i in range(m - x, -1, -1):
    if b[i]: b[i + x] = True
      
while not b[m]: m -= 1
print(m)
