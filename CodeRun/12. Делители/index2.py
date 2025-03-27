from tests.index import test, input
test(3)
  
n = 400000 # int(input())

def shive(n):
  primes = [i for i in range(n)]

  for i in range(2, n):
    if primes[i]: 
      for j in range(2 * i, n, i):
        primes[j] = 0
      
  return [i for i in primes if i > 1]

def max_divisors(n):
  primes = shive(int(n**.5) + 1)

  print(len(primes))
  maximum = 0
  ans = 0
  
  for i in range(n - 1, n // 2, -1):
    count = 1
    for p in primes:
      a = 1
      j = i
      while j % p == 0:
        j //= p
        a += 1
      count *= a
      
    if count > maximum:
      maximum = count
      ans = i

  return ans, maximum
print(max_divisors(n + 1))