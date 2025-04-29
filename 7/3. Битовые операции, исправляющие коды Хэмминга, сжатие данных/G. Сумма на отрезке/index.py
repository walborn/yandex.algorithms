from tests.index import test, input
test(2)

n, k = map(int, input().split())
a = [0] * (n + 1)

# удаляем единицы младших разрядов
# 101011 -> 101000
# def f(i): return i & (i + 1)
  
# инициализация t
# 1. насчитаем префиксные суммы для a
# p = [0]
# for i in range(n): p.append(p[-1] + a[i])
# t = [p[i + 1] - p[f(i)] for i in range(n) ]
t = [0] * (n + 1) # поскольку изначально у нас все нули

# учимся вычислять суммы на отрезке
# sum(a[:r]) = t[r] + sum(a[:f(r) - 1]) 
# sum(a[:6]) = t[6] + sum(a[:5])
#            = t[6] + t[5] + sum(a[:3])
#            = t[6] + t[5] + t[3]

def query(i):
  res = 0
  while i > 0:
    res += t[i]
    #i -= i & -i
    i &= i + 1
    i -= 1

  return res

def update(i, x):
  while i <= n:
    t[i] += x
    # i += i & -i 
    i |= i + 1
    
for _ in range(k):
  typ, i, j = input().split()
  
  if typ == 'A':
    i, x = int(i), int(j)
    update(i, x - a[i])
    a[i] = x
  elif typ == 'Q':
    l, r = int(i), int(j)
    print(query(r) - query(l - 1))