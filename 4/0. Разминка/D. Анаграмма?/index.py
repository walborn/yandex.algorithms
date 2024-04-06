# B. Сложить две дроби
from tests.index import test, input
test(1)

__input__ = input
def input():
  try: return __input__()
  except: return None

print('YES' if ''.join(sorted(input())) == ''.join(sorted(input())) else 'NO')
