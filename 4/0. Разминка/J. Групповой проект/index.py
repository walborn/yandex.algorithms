# B. Сложить две дроби
from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None
  
  
  
def fn(n, a, b):
  return 'YES' if n // a > n // b or n % a == 0 else 'NO'
  
for _ in range(int(input())):
  print(fn(*map(int, input().split())))


