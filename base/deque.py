class Node:
  def __init__(self, key, nxt=None, prv=None):
    self.key = key
    self.nxt = nxt
    self.prv = prv

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

  def delete(self, node):
    node.nxt.prv = node.prv
    node.prv.nxt = node.nxt
    self._size -= 1
    
    
deque = Deque()