n = int(input())
a, b, c = 1, 1, 2
for i in range(1, n):
  a, b, c = b, c, a + b + c

print(c)