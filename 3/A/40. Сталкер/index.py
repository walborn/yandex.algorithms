import argparse
import os
import sys
from time import perf_counter

with open('main.py') as src:
  code = src.read()

def func():
  exec(code)
    
if __name__ == '__main__':
  parser = argparse.ArgumentParser()

  parser.add_argument('-t', type=str, default='', help='list of tests')

  args = parser.parse_args()

  tests = args.t.split(',') if args.t else os.listdir('input')
  print()

  for i in tests:
    print(f'test {i}:', file=sys.stderr, end=' ')

    with open(str(i), 'w') as sys.stdout:
      sys.stdin = open(f'input/{i}')
      tic = perf_counter()
      func()
      toc = perf_counter()
      print(f'{int(1000 * (toc - tic))}ms', file=sys.stderr, end=' ')

    sys.stdin = open(str(i))
    with open(f'output/{i}') as expected:
      j = 0
      for y in expected:
        x = input().strip()
        j += 1
        if x != y.strip():
          exit(f'\nline {j}: expected {y}, got {x}\n')

    os.remove(str(i))
    print('ok\n', file=sys.stderr)
