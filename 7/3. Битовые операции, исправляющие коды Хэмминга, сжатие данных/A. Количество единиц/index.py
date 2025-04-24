from tests.index import test, input
test(1)

n = int(input())

ans = 0
while n:
  if n & 1:
    ans += 1
  n >>= 1

print(ans)