# A. Не минимум на отрезке
from tests.index import test, input
test(1)

__input__ = input
def input():
  try: return __input__()
  except: return None


s = input()
n = len(s)
p = 10**9 + 7
h = [0] + [None] * n
x = [257] + [None] * n


for i in range(n):
  h[i + 1] = (h[i] * x[0] + ord(s[i]) - 96) % p
  x[i + 1] = (x[i] * x[0]) % p

def isequal(l, a, b):
  return (h[a + l] + h[b] * x[l - 1]) % p == (h[b + l] + h[a] * x[l - 1]) % p
  
for _ in range(int(input())):
  print('yes' if isequal(*map(int, input().split())) else 'no')

