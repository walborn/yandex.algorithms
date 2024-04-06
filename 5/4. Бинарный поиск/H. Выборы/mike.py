# не работает - смотрите mike.js
from tests.test import test, input
test(1)
 
# def binarySearch(l, r, check):
#   while l < r:
#     m = (l + r + 1) >> 1
#     if check(m): l = m
#     else: r = m - 1
#   return l

def binarySearch(l, r, check):
  while l < r:
    m = (l + r) // 2
    if check(m): r = m
    else: l = m + 1
  return l


# ищем первую партию, которая выше определенного уровня level
def getcntvotes(i, voters, suffixsum, level):
  j = binarySearch(0, len(voters) - 1, lambda x: voters[x][0] > level)
  
  # не нашли такой
  if voters[j][0] <= level: return 0
  print(i, level, voters[j][0], j)
  
  # подсчитываем кол-во голосов, выше этого уровня
  cntvoters = suffixsum[j] - level * (len(voters) - j)
  
  # если убрали голоса нашей партии, то возвращаем их
  if voters[i][0] > level: cntvoters -= (voters[i][0] - level)
    
  return cntvoters

# моделируем
def model(voters, i, suffixsum):
  l = 0
  r = 10 ** 6
  # находим нужный уровень
  while l < r:
    m = (l + r) // 2
    cntvoters = getcntvotes(i, voters, suffixsum, m)
    if voters[i][0] + cntvoters >= m: 
      l = m + 1
    else:
      r = m
      
  cntvoters = getcntvotes(i, voters, suffixsum, l)

  # сколько мы можем вернуть взад
  recovery = max(0, voters[i][0] + cntvoters - l - 2)
  return cntvoters - recovery, l, recovery

n = int(input())
p = [0] * n
voters = [0] * n

for i in range(n):
  v, p[i] = map(int, input().split())
  voters[i] = (v, i)
 
voters.sort()
 
suffixsum = [0] * n
suffixsum[-1] = voters[-1][0]

for i in range(n - 2, -1, -1):
  suffixsum[i] = suffixsum[i + 1] + voters[i][0]
  
  
mincost = 10**6 + 10**6 * 10**6 + 1

for i in range(n):
  if p[voters[i][1]] != -1:
    cost, level, recovery = model(voters, i, suffixsum)
    if p[voters[i][1]] + cost < mincost:
      mincost = p[voters[i][1]] + cost
      ans = [ i, cost, level, recovery ]

winner, cost, level, recovery = ans
resvotes = [0] * n

for i in range(n):
  if i == winner:
    resvotes[voters[i][1]] = voters[i][0] + cost
  elif voters[i][0] <= level:
    resvotes[voters[i][1]] = voters[i][0]
  else:
    if recovery > 0:
      resvotes[voters[i][1]] = level + 1
      recovery -= 1
    else:
      resvotes[voters[i][1]] = level

print(mincost)
print(voters[winner][1] + 1)
print(*resvotes)