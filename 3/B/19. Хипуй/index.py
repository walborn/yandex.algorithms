from tests.index import test, input
test(2)

heap = []

def insert(heap, x):
  heap.append(x)
  i = len(heap) - 1
  while True:
    if i == 0: break
    j = (i - 1) // 2
    if heap[i] <= heap[j]: break
    x = heap[j]
    heap[i], heap[j], i = heap[j], heap[i], j

def extract(heap):
  x = heap[0]
  heap[0] = heap[-1]
  n = len(heap)
  i = 0
  while True:
    l, r = i * 2 + 1, i * 2 + 2
    if l >= n: break
    j = l if r >= n or heap[l] >= heap[r] else r
    if heap[i] >= heap[j]: break
    heap[i], heap[j], i = heap[j], heap[i], j
  heap.pop()
  return x

for _ in range(int(input())):
  i = input()
  if i[0] == '0':
    insert(heap, int(i[2:]))
  else:
    print(extract(heap))