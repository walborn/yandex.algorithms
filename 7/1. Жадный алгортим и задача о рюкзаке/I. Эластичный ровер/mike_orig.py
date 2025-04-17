from tests.index import test, input
from utils import permutations, gen, compare
test(2)

n, s = map(int, input().split())

items = [0] * (n + 1)
items[0] = [0, 0, -1, 0] # volume, cost, pressure, number
total_vol = 0
max_pressure = 0

for i in range(1, n + 1):
  items[i] = list(map(int, input().split())) + [i]
  total_vol += items[i][0]
  max_pressure = max(max_pressure, items[i][2])

items.sort(reverse=True, key=lambda x: x[2]) # sort by pressure
items = [[0, 0, 0, 0]] + items

total_vol = min(total_vol, s + max_pressure)

ks = []
for i in range(n + 1):
  ks.append([])
  for j in range(total_vol + 1):
    ks[i].append([-1, 0, max_pressure + 1])
  
ks[0][0][0] = 0 # index, sum_cost, min_pressure, used

for i in range(1, n + 1):
  for j in range(total_vol + 1):
    for k in range(3):
      ks[i][j][k] = ks[i - 1][j][k]
  for j in range(min(total_vol - items[i][0], s + items[i][2] - items[i][0]), -1, -1):
    if ks[i][j][0] != -1:
      if ks[i][j][1] + items[i][1] > ks[i][j + items[i][0]][1] and j + items[i][0] <= s + items[i][2]:
        ks[i][j + items[i][0]][0] = i
        ks[i][j + items[i][0]][1] = ks[i][j][1] + items[i][1]
        ks[i][j + items[i][0]][2] = items[i][2]

best_vol = 0
for i in range(total_vol + 1):
  if ks[-1][i][1] > ks[-1][best_vol][1]:
    best_vol = i

answer = []
now_vol = best_vol
line_no = n
while now_vol > 0:
  answer.append(items[ks[line_no][now_vol][0]][3])
  new_vol = now_vol - items[ks[line_no][now_vol][0]][0]
  line_no = ks[line_no][now_vol][0] - 1
  now_vol = new_vol

print(len(answer), ks[-1][best_vol][1])
print(*answer)