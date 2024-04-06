from os import path

def rel(filename): return path.join(path.dirname(__file__), filename)

__open__ = open
__test__ = 1
tests = {i: __open__(rel(str(i))).read().split('\n') for i in range(11)}

def input(): return tests[__test__].pop(0)

def open(filename): return __open__(rel(str(__test__)))

def test(i):
  global __test__
  __test__ = i

