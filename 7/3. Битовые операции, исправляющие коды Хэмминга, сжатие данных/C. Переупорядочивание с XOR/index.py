from tests.index import test, input
test(1)

input()

def ones(i):
  count = 0
  while i:
    count += 1
    i &= i - 1
  return count


a = []
n = 0
for i in map(int, input().split()):
  a.append(ones(i))
  n = max(n, i.bit_length())

b = [0] * len(a) # uses ones
r = [0] * len(a) # new numbers

prevs = [-1, -1]
m = n - 1
while m >= 0:
  x, y = (0, 1) if a[0] > a[1] else (1, 0)
  for i in range(2, len(a)):
    if a[i] > a[x]: x, y = i, x
    elif a[i] > a[y]: y = i
  
  if a[y] == 0:
    print('impossible' if a[x] else list(map(lambda i: f'{i:04b}', r)))
    print(a, b, r)
    break
    
  a[x] -= 1
  a[y] -= 1
  
  b[x] += 1
  b[y] += 1
  
  r[x] += 1<<(n - 1 - m)
  r[y] += 1<<(n - 1 - m)
  print(x, y, 1<<m, r)
  
  
  print('m', m)
  if x in prevs or y in prevs:
    m -= 1
    
  prevs = [x, y]
  # m = min(m, n - 1 - max(b))

  
    
  
