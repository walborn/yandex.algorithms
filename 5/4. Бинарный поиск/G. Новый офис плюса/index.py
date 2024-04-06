from tests.test import test, input
test(21)
 
n = int(input())

a, b = 1, 1

# 2 * x**2 + x - n = 0
x = int((-1 + (1 + 8 * n) ** 0.5) // 4)

a = n - x * (2 * x + 1)
b = 2 * (x + 1) - a
if a == 0:
  a = 1
  b -= 2
if b <= 0:
  b = 1 - b
if a >= 2 * (x + 1):
  a = 2 * (x + 1) - (a - 2 * (x + 1))

print(f'{a}/{b}')


