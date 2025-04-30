from tests.index import test, input
test(1)

class Queue:
  def __init__(self):
    self.stack = []

  def push(self, n):
    self.stack.append(n)
    return 'ok'
  
  def pop(self):
    return self.stack.pop(0) if self.stack else 'error'

  def front(self):
    return self.stack[0] if self.stack else 'error'
  
  def size(self):
    return len(self.stack)

  def clear(self):
    self.stack = []
    return 'ok'
  
  def exit(self):
    self.stack = []
    return 'bye'

queue = Queue()

while i:=input():
  command, *args = i.split()
  if command == 'push':
    print(queue.push(int(args[0])))
  elif command == 'pop':
    print(queue.pop())
  elif command == 'front':
    print(queue.front())
  elif command == 'size':
    print(queue.size())
  elif command == 'clear':
    print(queue.clear())
  elif command == 'exit':
    print(queue.exit())
    break