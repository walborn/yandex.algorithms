# в условии сказано, что разница 
# между предприятиями в запросах не больше 10,
# поэтому можно использовать двусвязный список
from tests.index import test, input
test(1)

class Node:
  def __init__(self, key, nxt=None, prv=None):
    self.key = key
    self.nxt = nxt
    self.prv = prv

class Deque:
  def __init__(self, array):
    self.head = None
    self.tail = None
    
    if array:
      self.tail = self.head = Node(array[0])
      for i in range(1, len(a)):
        node = Node(a[i])
        node.prv = self.tail
        self.tail.nxt = node
        self.tail = node
    
  def delete(self, node):
    if self.head == node:
      self.head = node.nxt
      self.head.prv = None
    else:
      node.prv.nxt = node.nxt
    
    if self.tail == node: 
      self.tail = node.prv
      self.tail.nxt = None
    else:
      node.nxt.prv = node.prv
      
  def insert_after(self, now, value):
    node = Node(value, now.nxt, now)

    if now.nxt: 
      now.nxt.prv = node
    else: # now.nxt == None
      self.tail = node
    
    now.nxt = node
    
  def get(self, v, i, node):
    while i < v:
      node = node.nxt
      i += 1
    while i > v:
      node = node.prv
      i -= 1
      
    return i, node

n = int(input())
a = list(map(int, input().split()))
total = sum(i*i for i in a)
deque = Deque(a)

now, i = deque.head, 0
print(total)

for _ in range(int(input())):
  e, v = map(lambda i: int(i) - 1, input().split())
  
  i, now = deque.get(v, i, now)
    
  left = now.key // 2
  right = (now.key + 1) // 2
  
  nxt, prv = now.nxt, now.prv
  
  if e: # divide
    total -= 2 * left * right
    deque.insert_after(now, right)
    now.key = left
  else: # close
    if now == deque.head:
      total += 2 * now.key * now.nxt.key
      nxt.key += now.key
      deque.delete(now)
      now = deque.head
    elif now == deque.tail:
      total += 2 * now.key * prv.key
      prv.key += now.key
      deque.delete(now)
      now = deque.tail
      i -= 1
    else:
      total += 2 * (prv.key * left + nxt.key * right - left * right)
      prv.key += left
      nxt.key += right
      deque.delete(now)
      now = nxt
      
  print(total)
      