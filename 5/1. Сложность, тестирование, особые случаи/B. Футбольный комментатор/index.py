# A. Не минимум на отрезке
from tests.index import test, input
test(1)

__input__ = input
def input():
  try: return __input__()
  except: return None

A, B = map(int, input().split(':'))
a, b = map(int, input().split(':'))
hostA = not (int(input()) - 1)
x = B - A + b - a 

print(0 if x < 0 else (x + int(hostA and B >= (a + x) or not hostA and b >= A)))
