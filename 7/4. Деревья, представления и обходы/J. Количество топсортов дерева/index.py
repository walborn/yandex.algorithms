from tests.index import test, input
test(20)
  
n = int(input())
a = list(map(int, input().split()))
b = a[:]
for i in range(n - 2, 1, -1):
  b[i] = (b[i] + b[i + 1]) % 1000000007

c = [0]*n
for i in range(n - 1):
  c[i] = a[i] * b[i + 1] % 1000000007
  
ans = 0
for i in range(n - 2):
  for j in range(i + 1, n - 1):
    ans = (ans + a[i] * c[j]) % 1000000007

print(ans)
