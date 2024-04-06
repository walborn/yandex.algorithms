from tests.index import test, input
test(2)

__input__ = input
def input():
  try: return __input__()
  except: return None


n = int(input())
values = list(map(int, input().split()))
a, b, k = map(int, input().split())

minsect = (a - 1) // k
maxsect = (b - 1) // k
ans = -1

for j in range(2):
  usedsect = [False] * n
  for i in range(minsect, maxsect + 1):
    ans = max(ans, values[i % n])
    if usedsect[i % n]: break
    usedsect[i % n] = True
  values = [ values[0] ] + values[1:][::-1]

print(ans)