from tests.index import test, input
test(1)

n = int(input())

a = list(map(int, input().split()))
m = max(a).bit_length()

b = []
def ones(i):
  count = 0
  while i:
    count += 1
    i &= i - 1
  return count

b = [ list(map(int, ('1'*ones(i)).ljust(m, '0'))) for i in a]

for i in range(m - 1):
  bit_sum = 0
  for j in range(n): bit_sum ^= b[j][i]
  if bit_sum == 0: continue
  
  for j in range(n):
    if b[j][i] == 1 and b[j][-1] == 0:
      b[j][i], b[j][-1] = 0, 1
      break
  else:
    for j in range(n):
      if b[j][i] == 0 and b[j][-1] == 1:
        b[j][i], b[j][-1] = 1, 0
        break

bit_sum = 0
for j in range(n):
  bit_sum ^= b[j][-1]
  
if bit_sum == 1:
  print('impossible')
else:
  ans = [int(''.join(map(str, i)), 2) for i in b]
  print(*ans)