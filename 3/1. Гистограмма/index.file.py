# 1. Гистограмма
from tests.index import test, open
test(1)

frequency = dict()
with open('input.txt') as fp:
  lines = fp.readlines()
  for line in lines:
    for i in ''.join(line.split()):
      frequency[i] = frequency.get(i, -1) + 1
  
s = sorted(frequency.keys())
n = max(frequency.values())
for i in range(n, -1, -1):
  t = list(map(lambda x: ' ' if i > frequency[x] else '#', s))
  print(*t, sep='')
print(*s, sep='')