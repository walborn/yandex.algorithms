from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None


s = input()
n = len(s)
z, i, l, r = [0] * n, 0, 0, 1

while True:
  while i < r and z[i - l] < r - i: z[i], i = z[i - l], i + 1
  if i == n: break # when r == n
  j = max(0, r - i) # when prev j == 0, then i == r + 1
  while i + j < n and s[j] == s[i + j]: j += 1
  z[i], l, r, i = j, i, i + j, i + 1

print(*z)