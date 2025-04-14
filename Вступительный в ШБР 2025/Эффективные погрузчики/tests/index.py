from os import path

def rel(filename): return path.join(path.dirname(__file__), filename)

testCase = []

def input():
  try: return testCase.pop(0)
  except: return None
  
def test(i):
  global testCase
  testCase = open(rel(str(i))).read().split('\n')
