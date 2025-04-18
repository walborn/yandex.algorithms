from math import log2, ceil
a = [3, 1, 3, 2, 6, 7, 5]
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
t = build([(i, 1) for i in a])
  
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