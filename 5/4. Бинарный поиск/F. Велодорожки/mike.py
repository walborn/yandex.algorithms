from tests.test import test, input
test(3)

def check(m):
  j = 0
  pmx = -10**9
  pmn = 10**9
  
  # i - левая граница вертикальной дорожки
  # j - правая плитка, вылезающая за дорожку
  for i in range(n):
    while j < n and x[j] < x[i] + m: j += 1
    mx = pmx
    mn = pmn
    
    if j != n:
      mx = max(mx, sufmax[j])
      mn = min(mn, sufmin[j])
    
    if mx - mn < m: return True
    
    pmx = prefmax[i]
    pmn = prefmin[i]
    
  return False
    
    
w, h, n = map(int, input().split())

a = sorted([(tuple(map(int, input().split()))) for _ in range(n)])

x = []
y = []

for j, i in a:
  x.append(j)
  y.append(i)
  
prefmin = [y[0]]*n
prefmax = [y[0]]*n
sufmin = [y[-1]]*n
sufmax = [y[-1]]*n

for i in range(1, n):
  prefmin[i] = min(prefmin[i-1], y[i])
  prefmax[i] = max(prefmax[i-1], y[i])
  
for i in range(n - 2, -1, -1):
  sufmin[i] = min(sufmin[i+1], y[i])
  sufmax[i] = max(sufmax[i+1], y[i])
  
l = 0
r = min(w, h)
while l < r:
  m = (l + r) // 2
  if check(m): r = m
  else: l = m + 1

print(l)


