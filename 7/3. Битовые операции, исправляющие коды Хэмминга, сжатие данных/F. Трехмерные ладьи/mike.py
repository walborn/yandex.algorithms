from tests.index import test, input
test(2)

import sys

n, k = map(int, sys.stdin.readline().split())

log_block = 10
bits_in_block = 1 << log_block
cnt_blocks = (n + bits_in_block - 1) >> log_block

xy = [[False] * n for _ in range(n)]
xz = [[0] * cnt_blocks for _ in range(n)]
yz = [[0] * cnt_blocks for _ in range(n)]

for i in range(k):
  x, y, z = map(lambda i: int(i) - 1, sys.stdin.readline().split())
  xy[x][y] = True
  z_block = z >> log_block
  z_pos = z & (bits_in_block - 1)
  z_set = 1 << z_pos
  xz[x][z_block] |= z_set
  yz[y][z_block] |= z_set


last_bits = (cnt_blocks << log_block) - n
last_block_filler = ((1 << last_bits) - 1) << (bits_in_block - last_bits)
for i in range(n):
  xz[i][-1] |= last_block_filler
  yz[i][-1] |= last_block_filler

filled_block = (1 << bits_in_block) - 1


for x in range(n):
  for y in range(n):
    if not xy[x][y]:
      for block in range(cnt_blocks):
        if xz[x][block] | yz[y][block] != filled_block:
          now_block = xz[x][block] | yz[y][block]
          now_pos = 1
          for i in range(bits_in_block):
            if now_block & now_pos == 0:
              print('NO')
              print(x + 1, y + 1, (block << log_block) + i + 1)
              sys.exit(0)
            now_pos <<= 1

print('YES')