from tests.index import test, input
test(1)

# закольцованный связный список
# Идея: 
# 1. номер раунда, на котором участник выбывает на +1 больше его соседей
# 2. обратное моделирование
# 3. любая впадина будет постепенно вырождаться, \/
# стабильная конструкция - плато, ___
# либо длинные ступеньки из >= 2 человек,---|___
# либо горка на равнине __/\___
# когда все одинаковые
# либо два человека ..
class Node:
  def __init__(self, key, pos, nxt=None, prv=None):
    self._key = key
    self._pos = pos
    self._nxt = nxt
    self._prv = prv

  @property
  def key(self): return self._key
  @key.setter
  def key(self, new_key): self._key = new_key
  @property
  def pos(self): return self._pos
  @pos.setter
  def pos(self, new_pos): self._pos = new_pos

  @property
  def nxt(self): return self._nxt

  @nxt.setter
  def nxt(self, new_nxt):
    self._nxt = new_nxt

  @property
  def prv(self):
    return self._prv

  @prv.setter
  def prv(self, new_prv):
    self._prv = new_prv
  
class Deque:
  def __init__(self, *a):
    self.head = None
    self.tail = None
    self._size = 0
      
    
  def size(self):
    return self._size
  
  def push_back(self, *args):
    node = Node(*args)
    if self._size:
      node.prv = self.tail
      self.tail.nxt = node
      self.tail = node
    else:
      self.head = self.tail = node
      
    self._size += 1

  def push_front(self, *args):
    node = Node(*args)
    if self._size:
      node.nxt = self.head
      self.head.prv = node
      self.head = node
    else:
      self.head = self.tail = node
    
    self._size += 1
    
  def delete(self, node):
    node.nxt.prv = node.prv
    node.prv.nxt = node.nxt
    self._size -= 1

lst = Node(0, None)
deque = Deque()


n = int(input())
a = list(map(int, input().split()))
rounds = [0] * n
# время, раньше которых i-й человек не может уйти
# определяется через время реального ухода соседей
min_neighbors_rnd = [0] * n

# кольцевой двусвязный список
for i in range(len(a)): deque.push_back(a[i], i)
deque.tail.nxt = deque.head
deque.head.prv = deque.tail

now = deque.head
last_upd = now.pos
while True:
  if now.prv.key > now.key < now.nxt.key and now.nxt != now.prv:
    nxt, prv = now.nxt, now.prv
    rounds[now.pos] = min_neighbors_rnd[now.pos] + 1
    min_neighbors_rnd[nxt.pos] = max(min_neighbors_rnd[nxt.pos], rounds[now.pos])
    min_neighbors_rnd[prv.pos] = max(min_neighbors_rnd[prv.pos], rounds[now.pos])
    
    deque.delete(now)
    now, last_upd = prv, prv.pos
  else:
    now = now.nxt
    if now.pos == last_upd:
      break
print(*rounds)