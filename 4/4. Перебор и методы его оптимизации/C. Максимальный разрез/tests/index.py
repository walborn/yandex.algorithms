from os import path

def rel(filename): return path.join(path.dirname(__file__), filename)


def input(): return rows.pop(0)

def test(i):
  global rows
  rows = open(rel(str(i))).read().split('\n')

