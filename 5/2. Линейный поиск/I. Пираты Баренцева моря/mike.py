from tests.index import test, input
test(1)

__input__ = input
def input():
  try: return __input__()
  except: return None


n = int(input())
ships = sorted([tuple(map(int, input().split()) for _ in range(n))])

ans = n ** 2

for col in range(n):
  now = 0
  for i in range(n):
    y, x = ships[i]
    now += abs(y - i - 1) + abs(x - col - 1)
  ans = min(ans, now)

print(ans)

  