from tests.index import test, input
test(1)

from math import ceil, log2

n = int(input())
a = list(map(int, input().split()))
m = 2 ** ceil(log2(n))

HASH = 0
LEN = 1
PROP = 2
MAGIC = 10
mod = 10**9 + 7

powers = [1] * (2 * m)
sum_powers = [0] * (2 * m)
for i in range(1, 2 * m):
  powers[i] = (powers[i - 1] * MAGIC) % mod
  sum_powers[i] = (sum_powers[i - 1] + powers[i]) % mod

o = [0, 0, 0]
def op(left, right):
  now_hash = (left[HASH] * powers[right[LEN]] + right[HASH]) % mod
  now_len = left[LEN] + right[LEN]
  return [now_hash, now_len, 0]
  
# build tree
tree = [o for _ in range(2 * m)]
for i in range(n):
  tree[m + i] = [a[i] * MAGIC, 1, 0]
for i in range(m - 1, 0, -1):
  tree[i] = op(tree[2 * i], tree[2 * i + 1])

def query(l, r, now = 1, tl = 0, tr = m - 1):
  if l > tr or r < tl: return o
  
  left = 2 * now 
  right = 2 * now + 1
  
  if tree[now][PROP]:
    if tl != tr: tree[left][PROP] = tree[right][PROP] = tree[now][PROP]
    
    tree[now][HASH] = (tree[now][PROP] * sum_powers[tree[now][LEN]]) % mod
    tree[now][PROP] = 0
    
  if l <= tl and r >= tr:
    return tree[now]
  
  tm = (tl + tr) // 2
  return op(
    query(l, r, left, tl, tm),
    query(l, r, right, tm + 1, tr)
  )
  
def update(l, r, x, now = 1, tl = 0, tr = m - 1):
  if l > tr or r < tl: return

  if l <= tl and r >= tr:
    tree[now][PROP] = x
    tree[now][HASH] = (sum_powers[tree[now][LEN]] * x) % mod
    return

  left = 2 * now
  right = 2 * now + 1
  if tree[now][PROP]:
    tree[left][PROP] = tree[right][PROP] = tree[now][PROP]
    tree[left][HASH] = (tree[left][PROP] * sum_powers[tree[left][LEN]]) % mod
    tree[right][HASH] = (tree[right][PROP] * sum_powers[tree[right][LEN]]) % mod
  
  tm = (tl + tr) // 2
  update(l, r, x, left, tl, tm )
  update(l, r, x, right, tm + 1, tr)
  
  tree[now] = op(tree[left], tree[right])
  
for _ in range(int(input())):
  q, l, r, x = map(int, input().split())
  if q == 1:
    h1 = query(l - 1, l - 2 + x)
    h2 = query(r - 1, r - 2 + x)
    print('+' if h1[0] == h2[0] else '-', end='')
  else:
    update(l - 1, r - 1, x)
