from tests.index import test, input
test(1)

n = int(input())
a = [ int(input()) for _ in range(n) ]

# ans = 0
# for i in range(n):
#   for j in range(i + 1, n):
#     if a[i] < a[j]:
#       ans += 1
  
  
# # Класс дерева Фенвика
# class FenwickTree:
#   def __init__(self, size):
#     self.size = size
#     self.tree = [0] * (size + 1)  # Индексация с 1

#   def update(self, i, val):
#     # Добавление значения val к индексу i
#     while i <= self.size:
#       self.tree[i] += val
#       i += i & -i  # Переход к следующему индексу

#   def query(self, i):
#     # Вычисление суммы от 1 до i
#     sum = 0
#     while i > 0:
#       sum += self.tree[i]
#       i -= i & -i  # Переход к предыдущему индексу
#     return sum

# # Функция для подсчёта чисел справа, которые больше текущего
# def count_greater_to_right(a):
#   if len(a) < 2: return 0

#   sorted_unique = sorted(set(a))
#   rank_dict = {val: idx for idx, val in enumerate(sorted_unique)}
#   m = len(sorted_unique)  # Количество уникальных значений

#   # Шаг 2: Инициализируем дерево Фенвика
#   fenwick = FenwickTree(m)

#   # Шаг 3: Инициализируем массив результатов
#   n = len(a)
#   result = [0] * n

#   # Шаг 4: Обходим массив справа налево
#   for i in range(n - 1, -1, -1):
#     rank = rank_dict[a[i]]  # Ранг текущего элемента
#     # Запрашиваем количество элементов с рангами > rank
#     count = fenwick.query(m) - fenwick.query(rank + 1)
#     ans += count
#     # Добавляем текущий элемент в дерево Фенвика
#     fenwick.update(rank + 1, 1)

#   return result


class FenwickTree:
  def __init__(self, size):
    self.size = size
    self.tree = [0] * (size + 1)

  def update(self, i, val):
    while i <= self.size:
      self.tree[i] += val
      i += i & -i

  def query(self, i):
    s = 0
    while i > 0:
      s += self.tree[i]
      i -= i & -i
    return s


sorted_unique = sorted(set(a))
ranks = {x: i for i, x in enumerate(sorted_unique)}
m = len(sorted_unique)

fenwick = FenwickTree(m)
ans = 0

for i in range(n - 1, -1, -1):
  rank = ranks[a[i]] + 1
  ans += fenwick.query(m) - fenwick.query(rank)
  fenwick.update(rank, 1)


print(ans)
# Пример использования
# print(count_greater_to_right([3, 1, 4, 2], 4))  # Вывод: [1, 2, 0, 0]
# print(count_greater_to_right(a, n))  # Вывод: [1, 2, 0, 0]

