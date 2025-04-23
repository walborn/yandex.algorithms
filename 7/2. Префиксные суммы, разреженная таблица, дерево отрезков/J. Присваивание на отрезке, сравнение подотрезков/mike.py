from tests.index import test, input
test(1)

HASH = 0
LEN = 1
PROP = 2
MAGIC = 10
P = 10**9 + 7

def join_nodes(left, right):
  now_hash = (left[HASH] * powers[right[LEN]] + right[HASH]) % P
  now_len = left[LEN] + right[LEN]
  return [now_hash, now_len, 0]

def build_tree(a):
  n = 1
  while n < len(a):
    n *= 2
  tree = []
  for i in range(n - 1):
    tree.append([0, 0, 0])
  for i in range(len(a)):
    tree.append([a[i] * MAGIC, 1, 0])
  for i in range(n - len(a)):
    tree.append([0, 0, 0])
  for i in range(n - 2, -1, -1):
    left = 2 * i + 1
    right = 2 * i + 2
    tree[i] = join_nodes(tree[left], tree[right])
  return tree
  
def query(tree, q_l, q_r, now, n_l, n_r):
  if q_l > n_r or q_r < n_l:
    return [0, 0, 0]
  left = 2 * now + 1
  right = 2 * now + 2
  
  if tree[now][PROP] != 0:
    if n_l != n_r:
      tree[left][PROP] = tree[now][PROP]
      tree[left][HASH] = (tree[left][PROP] * sum_powers[tree[left][LEN]]) % P
      tree[right][PROP] = tree[now][PROP]
      tree[right][HASH] = (tree[right][PROP] * sum_powers[tree[right][LEN]]) % P
    tree[now][HASH] = (tree[now][PROP] * sum_powers[tree[now][LEN]]) % P
    tree[now][PROP] = 0
  if q_l <= n_l and q_r >= n_r:
    return tree[now]
  left_ans = query(tree, q_l, q_r, left, n_l, (n_l + n_r) // 2)
  right_ans = query(tree, q_l, q_r, right, (n_l + n_r) // 2 + 1, n_r)
  return join_nodes(left_ans, right_ans)
  
def seg_update(tree, q_l, q_r, now, n_l, n_r, new_val):
  if q_l <= n_l and q_r >= n_r:
    tree[now][PROP] = new_val
    tree[now][HASH] = (sum_powers[tree[now][LEN]] * new_val) % P
    return tree[now]
  if q_l > n_r or q_r < n_l:
    return [0, 0, 0]
  left = 2 * now + 1
  right = 2 * now + 2
  if tree[now][PROP] != 0:
    tree[left][PROP] = tree[now][PROP]
    tree[left][HASH] = (tree[left][PROP] * sum_powers[tree[left][LEN]]) % P
    tree[right][PROP] = tree[now][PROP]
    tree[right][HASH] = (tree[right][PROP] * sum_powers[tree[right][LEN]]) % P
    tree[now][PROP] = 0
  left_ans = seg_update(tree, q_l, q_r, left, n_l, (n_l + n_r) // 2, new_val)
  right_ans = seg_update(tree, q_l, q_r, right, (n_l + n_r) // 2 + 1, n_r, new_val)
  tree[now] = join_nodes(tree[left], tree[right])
  return join_nodes(left_ans, right_ans)
  
n = int(input())
a = list(map(int, input().split()))
powers = [1] * (n * 4)
sum_powers = [0] * (n * 4)
for i in range(1, n * 4):
  powers[i] = (powers[i - 1] * MAGIC) % P
  sum_powers[i] = (sum_powers[i - 1] + powers[i]) % P
tree = build_tree(a)
m = int(input())
ans = []
for i in range(m):
  q = list(map(int, input().split()))
  l, r, k = q[1:]
  if q[0] == 1:
    h1 = query(tree, l - 1, l - 2 + k, 0, 0, len(tree) // 2)
    h2 = query(tree, r - 1, r - 2 + k, 0, 0, len(tree) // 2)
    if h1[0] == h2[0]:
      ans.append('+')
    else:
      ans.append('-')
  else:
    seg_update(tree, l - 1, r - 1, 0, 0, len(tree) // 2, k)
print(''.join(ans))