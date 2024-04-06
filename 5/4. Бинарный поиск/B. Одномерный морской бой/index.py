n = int(input())

def binarySearch(l, r, check):
  while l < r:
    m = (l + r + 1) >> 1
    if check(m): l = m
    else: r = m - 1
  return l


def check(k): return 6 * (n + 1) >= k * (k + 1) * (k + 5)

print(binarySearch(0, n, check))