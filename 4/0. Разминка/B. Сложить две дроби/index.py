# B. Сложить две дроби
from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None

def gcd(a, b): return gcd(b, a % b) if b else a

a, b, x, y = map(int, input().split())

A, B = a * y + b * x, b * y
D = gcd(A, B)
print(A // D, B // D)
   
