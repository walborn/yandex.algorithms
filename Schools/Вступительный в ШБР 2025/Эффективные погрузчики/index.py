from tests.index import test, input
test(5)

n = int(input())
a = list(map(int, input().split()))

def longestPath(n, a):
  def path(l, r):
    while l >= 0 and r < len(a) and a[l] == a[r]:
      l -= 1
      r += 1
    return r - l - 1

  def getPath(i):
    odd = path(i, i)
    even = path(i, i + 1)
    return max(odd, even)


  lng = 0

  i = n // 2
  while i < n - lng//2:
    lng = max(lng, getPath(i))
    i += 1

  i = n // 2 - 1
  
  while i >= lng//2:
    lng = max(lng, getPath(i))
    i -= 1

  return 0 if lng == 1 else lng


print(longestPath(n, a))