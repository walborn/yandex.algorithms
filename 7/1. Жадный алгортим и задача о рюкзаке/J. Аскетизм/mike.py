from tests.index import test, input
test(1)

n, m = map(int, input().split())
a = sorted([(int(b), a) for a, b in [input().split() for _ in range(n)]])
C = a[-1][0] + 1

# рюкзак вместительностью C 
dp = {0: 0}

names = []
ans = 0

for i in range(n):
  cost = -1
  v, name = a[i]
  # ищем минимальный способ избавиться от предмета в интервале now - d, now
  for j in range(max(0, v - m), v + 1):
    if j in dp:
      if cost == -1:
        cost = dp[j]
      else:
        cost = min(cost, dp[j])

  if cost == -1: continue
  
  cost += 1 # избавляемся от нашего и вернем все предметы
  ans += cost
  
  names.append(name)
  # теперь мы знаем стоимость предмета (сколько дней от него избавляться)
  # добавляем предмет в задачу о рюкзаке
  for j in range(C - v - 1, -1, -1):
    if j in dp:
      if (j + v) in dp:
        dp[j + v] = min(dp[j + v], dp[j] + cost)
      else:
        dp[j + v] = dp[j] + cost  
  
print(len(names), ans)
print('\n'.join(sorted(names)))