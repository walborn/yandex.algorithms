from tests.index import test, input
test(2)
# алгоритм Лемпела-Зива-Велча

# используем 5 бит на букву
# использование гарантированного количества бит на хранение номера слова 
def binary(x, bits): return bin(x)[2:].zfill(bits)
def code(char): return ord(char) - 97 # ord('a')
def char(code): return chr(97 + code)
def make_packed(b):
  return [ int(b[i:i+8], 2) for i in range(0, len(b), 8) ]

def get_pair(packed, i, bits):
  j = i + bits
  x = int(packed[i:j], 2)
  return (x, x and int(packed[j:j+5], 2))

typ = input()
if typ == 'pack':
  s = input()

  dct = {('zero_filler') : 0, () : 1}
  ans = []
  bits = 1
  seq = ()
  i = 0
  
  while i < len(s):
    if seq in dct:
      prev = dct[seq]
      seq += (code(s[i]),)
      i += 1
    else:
      ans.append(binary(prev, bits))
      ans.append(binary(seq[-1], 5))
      
      dct[seq] = len(dct)
      if len(dct) > 1 << bits: bits += 1
      seq = ()
      
  if len(seq):
    ans.append(binary(prev, bits))
    ans.append(binary(seq[-1], 5))
    
  ans = ''.join(ans)
  ans += '0'*(-len(ans) % 8)

  packed = make_packed(ans)
  print(len(packed))
  print(*packed)

if typ == 'unpack':
  input()
  packed_lst = [('zero_filler', 0)]
  bits = 1
  
  packed = list()
  packed = ''.join([binary(byte, 8) for byte in map(int, input().split())])
  
  i = 0
  while i < len(packed):
    prev, symbol = get_pair(packed, i, bits)
    if prev: packed_lst.append((prev, symbol))
    i += bits + 5
    if len(packed_lst) >= 1 << bits: bits += 1

  unpack_dct = [(), ()]
  s = []
  for prev, sym_code in packed_lst[1:]:
    s.extend([char(c) for c in unpack_dct[prev]])
    s.append(char(sym_code))
    unpack_dct.append(unpack_dct[prev] + (sym_code,))
  print(''.join(s))