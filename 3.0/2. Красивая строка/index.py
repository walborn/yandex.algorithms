from tests.index import test, input
test(0)

K, S = int(input()) + 1, input()
n, s, r = len(S), S + '.', 0

for x in set(S):
  i, j, k = -1, -1, K

  while j < n and k:
    j += 1
    k -= int(s[j] != x)
    
  r = max(r, j - i)
  while j < n:
    i += 1
    j += 1
    while s[i] == x: i += 1
    while s[j] == x: j += 1
    r = max(r, j - i)

print(r - 1)