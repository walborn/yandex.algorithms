from tests.index import test, input
test(16)

# import sys
# input = sys.stdin.readline

n = int(input())
a = list(map(int, input().split()))
   
# Размер блока примерно sqrt(max_n)
d = 300
blocks = [a[i:i+d] for i in range(0, n, d)]
total = sum(i*i for i in a)
print(total)

# Функция для поиска блока и локального индекса
def find_block_and_index(v, i = 0):
  for block in blocks:
    i += len(block)
    if i > v: return block, v - i + len(block)

# Обработка запросов
for _ in range(int(input())):
  e, v = map(lambda i: int(i) - 1, input().split())
  
  if e:
    # разделение компании на две
    n += 1 # количество компаний станет на одну больше
    
    # Разделить компанию
    block, i = find_block_and_index(v)
    
    x = block[i]
    l, r = x // 2, (x + 1) // 2
    block[i] = l
    block.insert(i + 1, r)
    total -= 2 * l * r

    # Если блок слишком большой, разделяем его
    if len(block) == 2 * d:
      j = blocks.index(block)
      blocks[j] = block[:d]
      blocks.insert(j + 1, block[d:])

  else:
    # Обанкротить компанию
    n -= 1 # одной компании не станет
    
    # Первый элемент
    if v == 0:
      x = blocks[0].pop(0)
      if not blocks[0]: blocks.pop(0)
      
      block = blocks[0]
      y = block[0]
      block[0] += x

      total += 2 * x * y

    # Последний элемент
    elif v == n:
      x = blocks[-1].pop()
      if not blocks[-1]: blocks.pop()
      
      block = blocks[-1]
      y = block[-1]
      block[-1] += x
      
      total += 2 * x * y
      
    # Элемент в середине
    else:
      block, i = find_block_and_index(v)
      x = block.pop(i)
      if not block: blocks.remove(block)
      
      left, li = find_block_and_index(v - 1)
      right, ri = find_block_and_index(v)
      xl, xr = x // 2, (x + 1) // 2
      yl, yr = left[li], right[ri] 
      left[li] += xl
      right[ri] += xr
      
      total += 2 * (yl * xl + yr * xr - xl * xr)
    
  print(total)
