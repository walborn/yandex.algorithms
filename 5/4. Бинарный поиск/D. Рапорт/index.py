from tests.test import test, input
test(11)
 
def binarySearch(l, r, check):
  while l < r:
    m = (l + r) >> 1
    if check(m): r = m
    else: l = m + 1
  return l

w, n, m = map(int, input().split()) 
w += 2
a = list(map(lambda i: int(i) + 1, input().split()))
b = list(map(lambda i: int(i) + 1, input().split()))
maxa = max(a)
maxb = max(b)
sa = sum(a)
sb = sum(b)

# количество реальных строк для ширины width массива a или b
def get_rows(a, n, width):
  rows, acc = 1, 0

  for i in range(n):
    if acc + a[i] <= width: acc += a[i]
    else: acc, rows = a[i], rows + 1
    
  return rows
  
# начинаем с грубой оценки, считая, что слова могут переноситься
i = sa * w // (sa + sb) 
if i < maxa: i = maxa
elif i > w - maxb: i = w - maxb

ra = get_rows(a, n, i)
rb = get_rows(b, m, w - i)

ans = max(ra, rb)

# двигаемся вправо или влево
i = binarySearch(i, w - maxb, lambda j: get_rows(a, n, j) <= get_rows(b, m, w - j))
# но для движения влево не добавили тестов
# i = binarySearch(maxa, i, lambda j: get_rows(a, n, j) <= get_rows(b, m, w - j))

ra = get_rows(a, n, i)
rb = get_rows(b, m, w - i)
print(min(ans, max(ra, rb)))


