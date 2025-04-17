from tests.index import test, input
from utils import permutations, gen, compare
test(1)
  

n, s = map(int, input().split())
a = [(*map(int, input().split()), i) for i in range(n)]

def brutforce(a, V):
  a.sort(key=lambda i: i[2], reverse=True)
  perms = permutations(a)

  best = { 'sumc': 0, 'hist': [] }
  for perm in perms:
    sumv = 0
    sumc = 0
    hist = []
    minp = 10**9
    while perm:
      v, c, p, i = perm.pop()
      if sumv + v > V + min(minp, p):
        break

      minp = min(minp, p)
      sumv += v
      sumc += c
      hist.append(i + 1)
    
    if sumc > best['sumc']:
      best['sumc'] = sumc
      best['hist'] = hist

  return best['sumc'], best['hist']




# for i in range(100):
#   s, a = gen(10)
#   c, r = solve(a, s)
#   brutC, brutR = brutforce(a, s)

#   if c != brutC and not compare(r, brutR):
#     print(s, a)
#     print(c, r)
#     print(brutC, brutR)