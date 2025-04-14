from tests.index import test, input
from utils import permutations, gen, compare
test(7)
  

n, s = map(int, input().split())
a = sorted([(*map(int, input().split()), i) for i in range(n)], key=lambda i: i[2], reverse=True)

d = [0] + [-1] * (s + a[0][2])
q = [-1] * (1 + s + a[0][2])
ds, qs = [], []

C = 0 # самая дорогая сборка
I = 0 # ряд самой дорогой сборки

for i in range(n):
  v, c, p, _ = a[i]
  for j in range(s + p - v, -1, -1):
    x = d[j] + c
    if d[j] != -1 and d[j + v] < x:
      d[j + v] = x
      q[j + v] = i

  X = max(d)
  if C < X: C, I = X, i

  ds.append(d[:])
  qs.append(q[:])


j = ds[I].index(C)

# print(a)
# print(I, j, C)
# for d in ds:
#   print(*d)
# print('----')
# for q in qs:
#   print(*q)

r = []
for i in range(I, -1, -1):
  if j < 1: break
  v, c, p, index = a[qs[i][j]]
  r.append(index + 1)
  j -= v

print(len(r), C)
print(*r)



def brutforce(b, V):
  a = [(*b[i], i) for i in range(n)]
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

def solve(a, s):
  a = sorted([(*a[i], i) for i in range(n)], key=lambda i: i[2], reverse=True)

  d = [0] + [-1] * (s + a[0][2])
  q = [-1] * (1 + s + a[0][2])
  ds, qs = [], []

  C = 0 # самая дорогая сборка
  I = 0 # ряд самой дорогой сборки

  for i in range(n):
    v, c, p, _ = a[i]
    for j in range(s + p - v, -1, -1):
      x = d[j] + c
      if d[j] != -1 and d[j + v] < x:
        d[j + v] = x
        q[j + v] = i

    X = max(d)
    if C < X: C, I = X, i

    ds.append(d[:])
    qs.append(q[:])


  j = ds[I].index(C)

  r = []
  for i in range(I, -1, -1):
    if not j: break
    v, c, p, index = a[qs[i][j]]
    r.append(index + 1)
    j -= v

  return C, r



# for i in range(100):
#   s, a = gen(10)
#   c, r = solve(a, s)
#   brutC, brutR = brutforce(a, s)

#   if c != brutC and not compare(r, brutR):
#     print(s, a)
#     print(c, r)
#     print(brutC, brutR)