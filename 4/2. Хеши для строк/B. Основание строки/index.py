from tests.index import test, input
test(0)

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

l, d = len(s), 1
while d < l and not isequal(l - d, 0, d): d += 1
else: print(d)
