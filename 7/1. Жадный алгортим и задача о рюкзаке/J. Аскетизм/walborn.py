from tests.index import test, input
test(1)

n, m = map(int, input().split())
a = sorted([(int(b), a) for a, b in [input().split() for _ in range(n)]])

C = a[-1][0] + 1
dp = {0: 0}
ans = 0

for i in range(n + 1):
  # ищем минимальный способ избавиться от предмета в интервале now - d, now
  try:
    v, name = a[i]
    cost = min(dp[j] for j in dp if j >= max(0, v - m) and j <= v) + 1
  except: break
  
  ans += cost
  # теперь мы знаем стоимость предмета (сколько дней от него избавляться)
  # добавляем предмет в задачу о рюкзаке
  keys = sorted([j for j in dp if j + v <= C], reverse=True)
  
  for j in keys:
    dp[j + v] = min(dp.get(j + v, float('inf')), dp[j] + cost)

print(i, ans)
print('\n'.join(sorted(x[1] for x in a[:i])))