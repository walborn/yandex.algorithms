import sys
from collections import deque


ptr = 0
n = int(input[ptr])
ptr += 1
a = list(map(int, input[ptr:ptr + n]))
ptr += n

total = sum(x * x for x in a)
print(total)

q = int(input[ptr])
ptr += 1

for _ in range(q):
  e, v = map(int, input[ptr:ptr + 2])
  ptr += 2
  e -= 1
  v -= 1
  
  if e == 0:
    if v == 0:
      x = a.pop(0)
      total -= x * x
      a[0] += x
      total += a[0] * a[0] - (a[0] - x) ** 2
    elif v == len(a) - 1:
      x = a.pop()
      total -= x * x
      a[-1] += x
      total += a[-1] * a[-1] - (a[-1] - x) ** 2
    else:
      x = a.pop(v)
      total -= x * x
      left = x // 2
      right = (x + 1) // 2
      a[v - 1] += left
      a[v] += right
      total += (a[v - 1] ** 2 - (a[v - 1] - left) ** 2)
      total += (a[v] ** 2 - (a[v] - right) ** 2)
  else:
    val = a[v]
    left = val // 2
    right = (val + 1) // 2
    total -= val * val
    a[v] = left
    a.insert(v + 1, right)
    total += left * left + right * right
  
  print(total)
