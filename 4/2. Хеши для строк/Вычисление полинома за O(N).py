# Вычисление полинома за O(N)
# a[0] * x**(n-1) + a[1] * x**(n-2) + ... + a[n-2] * x + a[n-1]

r = 0
for i in range(n):
  r += r * x + a[i]
  
# по модулю
for i in range(n):
  r += (r * x + a[i]) % p