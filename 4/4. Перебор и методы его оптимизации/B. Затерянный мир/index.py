from tests.index import test, input
test(10)

n = int(input())

c = 0

def perm(a, diag = [False] * 4 * n):
  global c
  if len(a) == 0:
    c += 1
    return

  j = n - len(a)
  for i in range(len(a)):
    d = diag[:]
    x, y = a[i] + j, a[i] - j + 3 * n
    if d[x] or d[y]: continue
    d[x] = d[y] = True
    perm(a[:i] + a[i+1:], d)
    
perm(list(range(n)))
print(c)

# Воспользуемся алгоритмом поиска с возвратом:
# сначала поставим первого ферзя на первую горизонталь,
# а затем будем ставить каждого следующего ферзя на следующеую горизонталь так,
# чтобы все уже поставленные ферзи его не били
# (список таких хранится в списке pos). Если получается, что мы поставили ферзя на последнюю горизонталь,
# то мы прибавляем к combs - количеству возможных комбинаций расстановки ферзей - единицу.
# Если же мы перебрали все вертикали для горизонтали, то возвращаемся на предыдущую со списком,
# не содержащим ферзя на указанной горизонтали.

def combinations(n, row = 0, pos = [], combs = 0):
  for col in range(n):
    for i, j in pos:
      if i == row or j == col or i + j == row + col or i - j == row - col: break
    else:
      if row == n - 1: return combs + 1
      combs = combinations(n, row + 1, pos + [[row, col]], combs)
  return combs
   

for i in range(1, 11):
  print('N = ', i, ': ', combinations(i), sep='')

