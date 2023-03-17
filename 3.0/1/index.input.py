# 1. Гистограмма
from tests.index import test, input
test(1)

__input__ = input
def input():
  try: return __input__()
  except: return None

frequency = dict()

while (line:=input()) != None:
  for i in ''.join(line.split()):
    frequency[i] = frequency.get(i, -1) + 1

s = sorted(frequency.keys())
n = max(frequency.values())
for i in range(n, -1, -1):
  t = list(map(lambda x: '# '[i > frequency[x]], s))
  print(*t, sep='')
print(*s, sep='')

