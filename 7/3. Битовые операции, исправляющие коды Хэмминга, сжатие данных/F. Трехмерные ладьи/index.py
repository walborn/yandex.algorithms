from tests.index import test, input
test(1)

n, k = map(int, input().split())
rooks = [map(lambda i: int(i) - 1, input().split()) for i in range(k)]

yz, zx, xy = set(), set(), set()  
for x, y, z in rooks:
  yz.add((y, z))
  zx.add((z, x))
  xy.add((x, y))

def unattacked():
  for y in range(n):
    for z in range(n):
      if (y, z) not in yz:
        for x in range(n):
          if (x, y) not in xy and (z, x) not in zx:
            return (x + 1, y + 1, z + 1)

u = unattacked()
print('NO' if u else 'YES')
if u: print(*u)