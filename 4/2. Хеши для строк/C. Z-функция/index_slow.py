with open('input.txt', 'r') as fin: s = fin.readline().strip()

n = len(s)
p = 10**9 + 7
h = [0] + [None] * n
x = [257] + [None] * n

for i in range(n):
  h[i + 1] = (h[i] * x[0] + ord(s[i]) - 96) % p
  x[i + 1] = (x[i] * x[0]) % p
  
def isequal(l, a, b):
  return (h[a + l] + h[b] * x[l - 1]) % p == (h[b + l] + h[a] * x[l - 1]) % p

def bin(l, r, a, b, fn):
  if r - l < 2: return l
  m = (l + r) >> 1
  if fn(m, a, b): return bin(m, r, a, b, fn)
  return bin(l, m, a, b, fn)

r = [ (n - i if isequal(n - i, 0, i) else bin(0, n - i, 0, i, isequal)) for i in range(1, n) ]

with open('output.txt', 'w') as fout: fout.write('0 ' + ' '.join(map(str, r)))
