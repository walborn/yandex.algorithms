from os import path

def rel(filename): return path.join(path.dirname(__file__), filename)

def test(i):
  global data
  data = open(rel(str(i))).read().split('\n')

def input(): return data.pop(0)
