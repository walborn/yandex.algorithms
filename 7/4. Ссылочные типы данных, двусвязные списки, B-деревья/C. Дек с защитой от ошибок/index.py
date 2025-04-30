from tests.index import test, input
test(3)

class Deck:
  def __init__(self):
    self.stack = []

  def push_front(self, x):
    self.stack.insert(0, x)
    return 'ok'
  
  def push_back(self, x):
    self.stack.append(x)
    return 'ok'
  
  def pop_front(self):
    return self.stack.pop(0) if self.stack else 'error'

  def pop_back(self):
    return self.stack.pop() if self.stack else 'error'

  def front(self):
    return self.stack[0] if self.stack else 'error'
  
  def back(self):
    return self.stack[-1] if self.stack else 'error'
  
  def size(self):
    return len(self.stack)

  def clear(self):
    self.stack = []
    return 'ok'
  
  def exit(self):
    self.stack = []
    return 'bye'

deck = Deck()

while (i:=input()):
  command, *args = i.split()
  print(getattr(deck, command)(*args))
  if command == 'exit': break