from tests.index import test, input
test(1)

n = int(input())

a = list(map(int, input().split()))

print(sum([i**2 for i in a]))

for _ in range(int(input())):
  e, v = map(lambda i: int(i) - 1, input().split())
  # обанкротилось
  # значит его нужно поделить между двумя соседями
  if e == 0:
    if v == 0:
      x = a.pop(0)
      a[0] += x
    elif v == len(a) - 1:
      x = a.pop()
      a[-1] += x
    else:
      x = a.pop(v)
      a[v - 1] += x // 2
      a[v] += (x + 1) // 2
  else:
    # разделилась пополам
    a.insert(v + 1, (a[v] + 1) // 2)
    a[v] //= 2
    
  print(a)
  print(sum([i**2 for i in a]))