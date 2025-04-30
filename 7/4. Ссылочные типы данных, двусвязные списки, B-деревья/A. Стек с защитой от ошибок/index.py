from tests.index import test, input
test(1)

class Stack:
  def __init__(self):
    self.stack = []

  def push(self, n):
    self.stack.append(n)
    return 'ok'
  
  def pop(self):
    return self.stack.pop() if self.stack else 'error'

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
stack = Stack()

while i:=input():
  command, *args = i.split()
  if command == 'push':
    print(stack.push(int(args[0])))
  elif command == 'pop':
    print(stack.pop())
  elif command == 'back':
    print(stack.back())
  elif command == 'size':
    print(stack.size())
  elif command == 'clear':
    print(stack.clear())
  elif command == 'exit':
    print(stack.exit())
    break