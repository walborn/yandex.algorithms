from tests.index import test, input
test(5)

from time import time
start = time()

n = int(input())
values = list(map(int, input().split()))
lefts = [n - 1] + list(range(n - 1))
rights = list(range(1, n)) + [ 0 ]
rounds = [0] * n

rnd = 0
prv = set(range(n))

while prv:
  nxt = set()
  rnd += 1
  rs, ls = dict(), dict()
  for m in prv:
    l, r = lefts[m], rights[m]
    left, middle, right = values[l], values[m], values[r]
    if left > middle and right > middle and l != r:
      rs[l], ls[r] = r, l
      rounds[m] = rnd
      nxt.add(l)
      nxt.add(r)
  for i in ls: lefts[i] = ls[i]
  for i in rs: rights[i] = rs[i]
  prv = nxt
  
print(*rounds)
print(time() - start)


