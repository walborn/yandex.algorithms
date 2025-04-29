from tests.index import test, input
test(1)

n = int(input())

ans = 0
while n:
  ans += 1
  n &= n-1

print(ans)