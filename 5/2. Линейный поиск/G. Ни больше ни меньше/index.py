from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None


for _ in range(int(input())):
  n = int(input())
  lengths, length, minimum = [], 0, n
  
  for i in map(int, input().split()):
    minimum = min(minimum, i)
    # print(i, length, minimum)
    if length < minimum:
      length += 1
    else:
      lengths.append(length)
      length, minimum = 1, i
    
  if length:
    lengths.append(length)

  print(len(lengths))
  print(*lengths)