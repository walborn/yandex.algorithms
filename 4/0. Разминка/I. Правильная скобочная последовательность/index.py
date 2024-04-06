# B. Сложить две дроби
from tests.index import test, input
test(2)

__input__ = input
def input():
  try: return __input__()
  except: return None

q = []
pairs = { ')': '(', ']': '[', '}': '{' }

for i in input():
  if i in '([{':
    q.append(i)
  elif not len(q) or q.pop() != pairs[i]:
    print('no')
    break
else:
  print('no' if len(q) else 'yes')

