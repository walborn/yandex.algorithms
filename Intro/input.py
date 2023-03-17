# делаем чтение безопасным, если не знаем количество записей
__input__ = input
def input():
  try: return __input__()
  except: return None

normalize = lambda i: int(i) - 1

n, m = map(int, input().split())
x, y = map(normalize, input().split())
