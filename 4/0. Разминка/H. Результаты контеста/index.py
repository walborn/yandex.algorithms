# B. Сложить две дроби
from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None

a = int(input())
b = int(input())
n = int(input())

print('Yes' if a > (b // n + (1 if b % n else 0)) else 'No')