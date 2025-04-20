from math import log2, ceil
a = [2, 5, 3, 1, 7, 2, 4, 0]
k = ceil(log2(len(a)))

# как мы будем сравнивать
def op(x, y):
  if x[0] == y[0]: return (x[0], x[1] + y[1])
  return x if x[0] > y[0] else y

# нейтральное значение
# вообще-то тут должно быть (-inf, 0)
o = (0, 0)

def build(a):
  t = [o] * 2**(k + 1)
  for i in range(len(a)): t[2**k + i] = a[i]
  for i in range(2**k - 1, 0, -1): t[i] = op(t[2*i], t[2*i + 1])
  return t

# передадим массив a в обработанном виде (значение, количество)
# t = build([(i, 1) for i in a])
  
# запрос на подотрезок
def query(i, tl, tr, l, r):
  if l > r: return o
  if l == tl and r == tr: return t[i]
  tm = (tl + tr) // 2
  return op(
    query(i*2, tl, tm, l, min(r, tm)),
    query(i*2 + 1, tm + 1, tr, max(l, tm + 1), r))

# обновление i-го элемента значением x
def update(i, x, j = 1, l = 0, r = 2**k - 1):
  if l == r:
    t[j] = x
  else:
    m = (l+r) // 2
    if i <= m: update(i, x, 2*j, l, m)
    else: update(i, x, 2*j+1, m+1, r)
    t[j] = op(t[2*j], t[2*j+1])
    
# изменение элемента
def update(i, x):
  i += 2**k
  t[i] = x
  
  while i := i//2:
    t[i] = op(t[2*i], t[2*i+1])

# прибавление на отрезке
# например, мы хотим знать сколько человек находилось на сайте
# и выяснилось, что на отрезке [l, r] был ещё один человек
# нужно добавить его в статистику

# t[i] = (value, promises)
def addlr(i, dx, tl, tr, l, r):
  if l > r: return o
  
  v, dv = t[i]
  
  if l == tl and r == tr:
    t[i] = (v + dx, dv + dx)
    return t[i]
  
  tm = (tl + tr) // 2
  return op(
    addlr(i*2, dv + dx, tl, tm, l, min(r, tm)),
    addlr(i*2 + 1, dv + dx, tm + 1, tr, max(l, tm + 1), r))

# присваивание на отрезке
def op(x, y):
  return (max(x[0], y[0]), 0)

# нейтральное значение
# o = (-float('inf'), 0)
o = (0, 0)
 
a = [2, 5, 3, 1, 7, 2, 4, o[0]]
t = build([(i, 0) for i in a])

def querylr(i, x, tl, tr, l, r):
  if l > r: return o
  if l == tl and r == tr:
    t[i] = (x, x)
    while i := i//2:
      t[i] = op(t[2*i], t[2*i+1])
    return t[i]
  tm = (tl + tr) // 2
  return op(
    querylr(i*2,     x, tl, tm, l, min(r, tm)),
    querylr(i*2 + 1, x, tm + 1, tr, max(l, tm + 1), r))

# print(t)
# querylr(1, 3, 0, 7, 2, 5)
# print(t)

# изменения для сумм

def op(x, y):
  return (x[0] + y[0], 0)

# нейтральное значение
o = (0, 0)
 
a = [2, 5, 3, 1, 7, 2, 4, 0]
t = build([(i, 0) for i in a])

def add_for_sum(i, dx, tl, tr, l, r):
  if l > r: return o
  
  v, dv = t[i]
  
  if l == tl and r == tr:
    t[i] = (v + dx * (r - l + 1), dv + dx)
    while i := i//2:
      t[i] = op(t[2*i], t[2*i+1])
    return t[i]
  
  tm = (tl + tr) // 2
  return op(
    add_for_sum(i*2,     dv + dx, tl,     tm, l,              min(r, tm)),
    add_for_sum(i*2 + 1, dv + dx, tm + 1, tr, max(l, tm + 1), r         ),
  )

# print(t)
# add_for_sum(1, +1, 0, 7, 3, 5)
# print(t)

# k-й ноль на префиксе

def op(x, y):
  z = 0
  if x[0] == 0: z += x[1]
  if y[0] == 0: z += y[1]
  return (0, z)

# нейтральное значение
o = (0, 0)
 
a = [0, 0, 3, 0, 2, 2, 0, 1]
t = build([(i, 1) for i in a])

def prefixk0(i, j):
  if i >= 2**k: return i - 2**k
  l = t[i*2][1] # l zeroes in the left subtree
  if j > l: return prefixk0(i*2 + 1, j - l)
  return prefixk0(i*2, j)
  
print(t)
print(prefixk0(1, 4))