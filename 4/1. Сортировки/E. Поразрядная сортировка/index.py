# A. Не минимум на отрезке
from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None

n = int(input())
a = [ input() for _ in range(n) ]

print('Initial array:')
print(', '.join(a))

length = len(a[0])
for phase in range(1, length + 1):
  print('**********')
  print('Phase ' + str(phase))
  buckets = [[] for _ in range(10)]
  for i in a: buckets[int(i[-phase])].append(i)
  for i in range(10): print('Bucket ' + str(i) + ': ' + (', '.join(buckets[i]) if len(buckets[i]) else 'empty'))
  a = [i for bucket in buckets for i in bucket]
  
print('**********\nSorted array:')
print(', '.join(a))
  
  