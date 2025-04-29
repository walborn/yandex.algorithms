from tests.index import test, input
test(1)

def cnt_odd(s):
  ans = [0] * 17
  for i in range(1, len(s)):
    if s[i] == 1:
      for bit in range(17):
        if i & 1 == 1:
          ans[bit] += 1
        i >>= 1

  return ans

def make_lst(x):
  ans = [0]
  pow2 = 1
  added_bits = 1
  while pow2 <= len(x) + added_bits:
    pow2 <<= 1
    added_bits += 1
  next_pow2 = 1
  pos_in_x = 0
  for pos in range(1, len(x) + pow2):
    if pos == next_pow2:
      ans.append(0)
      next_pow2 <<= 1
    else:
      ans.append(int(x[pos_in_x]))
      pos_in_x += 1
    if pos_in_x >= len(x):
      break
  return ans

def set_control(lst, odds):
  pow2_pos = 1
  for i in range(17):
    if odds[i] % 2 == 1:
      lst[pow2_pos] = 1
    pow2_pos = pow2_pos << 1
    if pow2_pos >= len(lst):
      break

def find_broken_bit(odds):
  ans = 0
  pow2 = 1
  for now in odds:
    if now & 1 != 0:
      ans += pow2
    pow2 <<= 1
  return ans

def remove_control(lst):
  ans = []
  pow2_pos = 1
  for i in range(1, len(lst)):
    if i != pow2_pos:
      ans.append(lst[i])
    else:
      pow2_pos = pow2_pos << 1
  return ans

run = int(input())
if run == 1:
  x = input()
  lst = make_lst(x)
  odds = cnt_odd(lst)
  set_control(lst, odds)
  print(''.join(map(str, lst[1:])))
else:
  lst = [0] + list(map(int, input()))
  odds = cnt_odd(lst)
  broken_bit = find_broken_bit(odds)
  lst[broken_bit] = 1 - lst[broken_bit]
  ans = remove_control(lst)
  print(''.join(map(str, ans)))