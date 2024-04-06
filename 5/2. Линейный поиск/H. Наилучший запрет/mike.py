from tests.index import test, input
test(1)

__input__ = input
def input():
  try: return __input__()
  except: return None


def findmax(f, bannedrow, bannedcol):
  ans = 0
  r = c = 0
  for i in range(len(f)):
    if i != bannedrow:
      for j in range(len(f[i])):
        if j != bannedcol and f[i][j] > ans:
            ans = f[i][j]
            r, c = i, j
            
  return r, c, ans
    
    
    
n, m = map(int, input().split())
f = [ list(map(int, input().split())) for _ in range(n) ]

fr, fc, maxval = findmax(f, -1, -1)
banrowr, banrowc, tempval = findmax(f, fr, -1)
tempr, tempc, banrowval = findmax(f, fr, banrowc)
bancolr, bancolc, temval = findmax(f, -1, fc)
tempr, tempc, bancolval = findmax(f, bancolr, fc)

if banrowval < bancolval:
  print(fr + 1, banrowc + 1)
else:
  print(bancolr + 1, fc + 1)