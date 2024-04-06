# алгоритм Манакера
from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None

s = input()
n = len(s)

a = [0] * n
l, r = 0, -1


for i in range(n):
  j = 1 if i >= r else min(a[l+r-i], r-i+1)
  while j <= i and i + j < n and s[i - j] == s[i + j]: j += 1
  a[i] = j
  
  if i + j - 1 > r: 
    l = i - j + 1
    r = i + j - 1
  
b = [0] * n
l, r = 0, 0

for i in range(n):
  j = 0 if i >= r else min(b[l+r-i + 1], r-i+1)
  while j <= i - 1 and i + j < n and s[i - j - 1] == s[i + j]: j += 1
  b[i] = j
  
  if i + j - 1 > r: 
    l = i - j
    r = i + j - 1
    
print(sum(a) + sum(b))