from os import path

def rel(filename): return path.join(path.dirname(__file__), filename)

__open__ = open
def open(filename):
  return __open__(rel(filename))

################################
with open('input.txt') as fp:
  o = fp.readlines()
  n = len(o)
  def input(): return o.pop(0).replace('\n', '')

for _ in range(n):
  print(input()) # reading data
