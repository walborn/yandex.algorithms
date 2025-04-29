from tests.index import test, input
test(1)

n = int(input())

a = list(map(int, input().split()))
max_len = max(a).bit_length()

bits_a = []
for i in range(n):
  bits = list(map(int, str(bin(a[i]))[2:])) + [0] * (max_len - a[i].bit_length())
  bits.sort(reverse=True)
  bits_a.append(bits)
for i in range(max_len - 1):
  bit_sum = 0
  for j in range(n):
    bit_sum ^= bits_a[j][i]
  if bit_sum == 1:
    flag = False
    for j in range(n):
      if not flag and bits_a[j][i] == 1 and bits_a[j][-1] == 0:
        bits_a[j][i], bits_a[j][-1] = 0, 1
        flag = True
    if not flag:
      for j in range(n):
        if not flag and bits_a[j][i] == 0 and bits_a[j][-1] == 1:
          bits_a[j][i], bits_a[j][-1] = 1, 0
          flag = True
bit_sum = 0
for j in range(n):
  bit_sum ^= bits_a[j][-1]
if bit_sum == 1:
  print('impossible')
else:
  ans = []
  for i in range(n):
    s = ''.join(map(str, bits_a[i]))
    ans.append(int(s, 2))
  print(*ans)