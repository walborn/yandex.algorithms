from tests.index import test, input
test(2)

__input__ = input
def input():
  try: return __input__()
  except: return None


n = int(input())
values = list(map(int, input().split()))
values = values + values + values[:2]
a, b, k = map(int, input().split())

if a % k == 0 and a: a -= 1
if b % k == 0 and b: b -= 1

A = (a // k) % n
B = (b // k) % n
D = (b - a + a % k) // k

if D >= n: print(max(values))
else: print(max(values[A: A + D + 1] + values[-(A + D) - 2: -A - 1 ]))