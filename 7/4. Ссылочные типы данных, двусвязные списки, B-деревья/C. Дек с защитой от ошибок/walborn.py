from tests.index import test, input
test(6)

class Node:
  def __init__(self, key, nxt=None, prv=None):
    self._key = key
    self._nxt = nxt
    self._prv = prv

  @property
  def key(self):
    return self._key

  @key.setter
  def key(self, new_key):
    self._key = new_key

  @property
  def nxt(self):
    return self._nxt

  @nxt.setter
  def nxt(self, new_nxt):
    self._nxt = new_nxt

  @property
  def prv(self):
    return self._prv

  @prv.setter
  def prv(self, new_prv):
    self._prv = new_prv

  def __repr__(self):
    return f"Node(key={self.key})"

class Deque:
  def __init__(self):
    self.head = None
    self.tail = None
    self._size = 0
    
  def size(self):
    return self._size
  
  def push_back(self, value):
    node = Node(value)
    if self._size:
      node.prv = self.tail
      self.tail.nxt = node
      self.tail = node
    else:
      self.head = self.tail = node
      
    self._size += 1
    
    return 'ok'

  def push_front(self, value):
    node = Node(value)
    if self._size:
      node.nxt = self.head
      self.head.prv = node
      self.head = node
    else:
      self.head = self.tail = node
    
    self._size += 1
    
    return 'ok'
    
  def pop_back(self):
    if not self._size: return 'error'
    
    key = self.tail.key
    
    self._size -= 1
    self.tail = self.tail.prv
    # self.tail.nxt = None
    if not self._size: self.head = None

    return key
  
  def pop_front(self):
    if not self._size: return 'error'
    
    key = self.head.key
    
    self._size -= 1
    self.head = self.head.nxt
    # self.head.prv = None
    if not self._size: self.tail = None

    return key

  def back(self):
    if not self._size: return 'error'
    return self.tail.key
  
  def front(self):
    if not self._size: return 'error'
    return self.head.key
    
  def clear(self):
    self._size = 0
    self.head = self.tail = None
    return 'ok'

  def exit(self):
    self.clear()
    return 'bye'
    
deque = Deque()

while (i:=input()):
  command, *args = i.split()
  print(getattr(deque, command)(*args))
  if command == 'exit': break
  
  
# with open('input.txt', 'r') as fin:
#   while True:
#     command, *args = fin.readline().split()
#     print(getattr(deque, command)(*args))
#     if command == 'exit': break