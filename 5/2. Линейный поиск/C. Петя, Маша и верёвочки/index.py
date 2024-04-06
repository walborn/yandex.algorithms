from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None

n = int(input())
l = list(map(int, input().split()))

total = sum(l)
small = 2 * max(l) - total
print(small if small > 0 else total)


    


