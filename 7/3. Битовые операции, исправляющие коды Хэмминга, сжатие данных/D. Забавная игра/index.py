from tests.index import test, input
test(1)

n = int(input())

i, l = n, 0
while i:=i>>1: l += 1
  
ans = n
m = 1 << l
for _ in range(l - 1):
  n = (n & 1) * m + (n >> 1)
  ans = max(ans, n)
  
print(ans)