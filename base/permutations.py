# 1 variant. using itertools
import itertools
 
perms = itertools.permutations([1, 2, 3])
 
for p in perms:
  print(p)
    
# 2 variant. handmade
def permutations(a):
  if len(a) < 2: return [a]
  
  r = []
  for i in range(len(a)):
    r.extend([a[i]] + p for p in permutations(a[:i] + a[i+1:]))

  return r


perms = permutations(['a', 'b', 'c'])
for p in perms:
  print(p)