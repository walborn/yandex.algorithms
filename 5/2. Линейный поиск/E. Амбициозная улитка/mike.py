from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None

  
n = int(input())

maxgoodi = -1
maxbadi = -1

a, b = [], []
used = [False] * (n + 1)

for i in range(n):
  ta, tb = map(int, input().split())
  a.append(ta)
  b.append(tb)
  
  if ta >= tb and (maxgoodi == -1 or b[maxgoodi] < tb):
    maxgoodi = i
    
  if ta < tb and (maxbadi == -1 or a[maxbadi] < ta):
    maxbadi = i
    
ans = []
maxh = 0

for i in range(n):
  if a[i] > b[i] and i != maxgoodi:
    ans.append(i + 1)
    used[i + 1] = True
    maxh += a[i] - b[i]
    
if maxgoodi != -1 and (maxbadi != -1 and a[maxgoodi] > a[maxgoodi] - b[maxgoodi] + a[maxbadi]) or (maxbadi == -1):
  maxh += a[maxgoodi]
  ans.append(maxgoodi + 1)
  used[maxgoodi + 1] = True