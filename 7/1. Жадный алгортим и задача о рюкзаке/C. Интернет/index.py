from tests.index import test, input
test(2)
  
from math import ceil

m = int(input())
a = list(map(int, input().split()))

for i in range(31):
  if a[i]:
    for j in range(i + 1, 31):
      if a[j] <= a[i] * 2**(j - i):
        a[j] = 0
    
s = 0
best = m * a[0]

for i in range(30, -1, -1):
  if a[i]:
    best = min(best, s + ceil(m / a[i]) * 2**i)
    s += (m // a[i]) * 2**i
    m %= a[i]
    if m == 0:
      break
    
print(best)