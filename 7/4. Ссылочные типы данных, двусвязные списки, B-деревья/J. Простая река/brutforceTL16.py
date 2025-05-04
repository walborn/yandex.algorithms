from tests.index import test, input
test(16)

n = int(input())

a = list(map(int, input().split()))
s = sum([i**2 for i in a])

ans = [s]

for _ in range(int(input())):
  e, v = map(lambda i: int(i) - 1, input().split())
  # обанкротилось
  if e == 0:
    # значит его нужно поделить между двумя соседями
    if v == 0:
      s -= (a[0]**2 + a[1]**2)
      
      x = a.pop(0)
      a[0] += x
      s += a[0]**2
    elif v == len(a) - 1:
      s -= (a[-1]**2 + a[-2]**2)
      
      x = a.pop()
      a[-1] += x
      s += a[-1]**2
    else:
      s -= (a[v - 1]**2 + a[v]**2 + a[v + 1]**2)
      x = a.pop(v)
      a[v - 1] += x // 2
      a[v] += (x + 1) // 2
      s += (a[v - 1]**2 + a[v]**2)
      
  else:
    # разделилась пополам
    s -= a[v]**2
    a.insert(v + 1, (a[v] + 1) // 2)
    a[v] //= 2
    
    s += (a[v]**2 + a[v + 1]**2)
    
  ans.append(s)

print('\n'.join(map(str, ans)))