KEY = 0
PREV = 1
NEXT = 2
SIZE = 0
HEAD = 1
TAIL = 2

# [size, head, tail ]
def create_node(key, nxt=None, prev=None):
  return [key, nxt, prev]

def push_back(deque, key):
  new = create_node(key)
  if deque[SIZE] == 0:
    deque[HEAD] = deque[TAIL] = new
  else:
    new[PREV] = deque[TAIL]
    deque[TAIL][NEXT] = new
    deque[TAIL] = new
  deque[SIZE] += 1
  return 'ok'

def push_front(deque, key):
  new = create_node(key)
  if deque[SIZE] == 0:
    deque[HEAD] = deque[TAIL] = new
  else:
    new[NEXT] = deque[HEAD]
    deque[HEAD][PREV] = new
    deque[HEAD] = new
  deque[SIZE] += 1
  return 'ok'

def pop_back(deque):
  if deque[SIZE] == 0:
    return 'error'
  key = deque[TAIL][KEY]
  if deque[SIZE] == 1:
    deque[HEAD] = deque[TAIL] = None
  else:
    deque[TAIL] = deque[TAIL][PREV]
  deque[SIZE] -= 1
  return key

def pop_front(deque):
  if deque[SIZE] == 0:
    return 'error'
  key = deque[HEAD][KEY]
  if deque[SIZE] == 1:
    deque[HEAD] = deque[TAIL] = None
  else:
    deque[HEAD] = deque[HEAD][NEXT]
  deque[SIZE] -= 1
  return key

def back(deque):
  if deque[SIZE] == 0:
    return 'error'
  return deque[TAIL][KEY]

def front(deque):
  if deque[SIZE] == 0:
    return 'error'
  return deque[HEAD][KEY]

def clear(deque):
  deque[SIZE] = 0
  deque[HEAD] = deque[TAIL] = None
  return 'ok'
  
deque = [0, None, None]
with open('input.txt', 'r') as fin:
  while True:
    data = fin.readline().split()
    if not data:
      continue
    op = data[0]
    if op == 'push_back':
      key = int(data[1])
      print(push_back(deque, key))
    elif op == 'push_front':
      key = int(data[1])
      print(push_front(deque, key))
    elif op == 'pop_back':
      print(pop_back(deque))
    elif op == 'pop_front':
      print(pop_front(deque))
    elif op == 'front':
      print(front(deque))
    elif op == 'back':
      print(back(deque))
    elif op == 'size':
      print(deque[SIZE])
    elif op == 'clear':
      print(clear(deque))
    elif op == 'exit':
      print('bye')
      break