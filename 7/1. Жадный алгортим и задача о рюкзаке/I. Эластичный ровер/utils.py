import random

def permutations(a):
  if len(a) < 2: return [a]
  
  r = []
  for i in range(len(a)):
    for p in permutations(a[:i] + a[i+1:]):
      r.append([a[i]] + p)
    
  return r
 
def rand(l, r):
  return random.randint(l, r)

def gen(n = 4): 
  s = rand(0, 15)
  a = [ (rand(1, 15), rand(1,15), rand(1, 15)) for i in range(n) ]

  return s, a

def compare(a, b):
  a.sort()
  b.sort()
  if len(a) != len(b): return False
  for i in range(len(a)):
    if a[i] != b[i]:
      return False
    
  return True