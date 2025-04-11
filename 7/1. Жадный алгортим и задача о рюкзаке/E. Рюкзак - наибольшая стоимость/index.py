from tests.index import test, input
test(2)
  

n, m = map(int, input().split())
a = list(map(int, input().split()))
b = list(map(int, input().split()))

c = [(a[i], b[i]) for i in range(n)]

d = [0] + [-1] * m
    
for ai, bi in c:
  for i in range(m - ai, -1, -1):
    if d[i] != -1: d[i + ai] = max(d[i + ai], d[i] + bi)
      
print(max(d))
