from tests.test import test, input
test(1)
  
n, m = map(int, input().split(' ')) 
a = [0] + list(map(int, input().split(' ')))
for i in range(2, n + 1): a[i] += a[i-1]

def binarySearch(l, r, check):
  while l < r:
    m = (l + r + 1) >> 1
    if check(m): l = m
    else: r = m - 1
  return l


def check(x): return a[x + l] - a[x] <= s

print(a)
for _ in range(m):
  l, s = map(int, input().split(' ')) 
  j = binarySearch(0, n - l, check)
  print(j, a[j + l] - a[j])
  print((j + 1) if a[j + l] - a[j] == s else -1)
