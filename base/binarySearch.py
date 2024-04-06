# binary search

# It returns location of x in given array a
def lbin(a, x, l, r):
  while l < r:
    m = (l + r) // 2
    
    # If x is greater, ignore left half 
    if a[m] < x: l = m + 1
    # If x is smaller, ignore right half
    else: r = m
 
  # If we reach here, then the element
  # was not present
  return l
 
def rbin(a, x, l, r):
  while l < r:
    m = (l + r + 1) // 2
    
    # If x is not smaller, ignore left half 
    if a[m] <= x: l = m
    # If x is smaller, ignore right half
    else: r = m - 1
 
  # If we reach here, then the element
  # was not present
  return l
 

def lbinary(l, r, check):
  while l < r:
    m = (l + r) // 2
    if check(m): l = m + 1
    else: r = m
  return l
def rbinary(l, r, check):
  while l < r:
    m = (l + r + 1) // 2
    if check(m): l = m
    else: r = m - 1
  return l


a, x = [2, 3, 4, 10, 10, 10, 18, 20, 40], 5

i = lbin(a, x, 0, len(a) - 1)
j = rbin(a, x, 0, len(a) - 1)

# более универсальное
p = lbinary(0, len(a) - 1, lambda i: i < x)
q = lbinary(0, len(a) - 1, lambda i: i <= x)

print(i, a[i])
print(j, a[j])