from os import path

def rel(filename): return path.join(path.dirname(__file__), filename)

__open__ = open
def open(filename, typ):
  return __open__(rel(filename), typ)


KEY = 0
PREV = 1
NEXT = 2
POS = 3
SIZE = 0
HEAD = 1
TAIL = 2

# [size, head, tail ]
def create_node(key, pos, nxt=None, prev=None):
  return [key, nxt, prev, pos]

def push_back(lst, key, pos):
  new = create_node(key, pos)
  if lst[SIZE] == 0:
    lst[HEAD] = lst[TAIL] = new
  else:
    new[PREV] = lst[TAIL]
    lst[TAIL][NEXT] = new
    lst[TAIL] = new
    
  lst[SIZE] += 1

def delete(lst, now):
  nxt = now[NEXT]
  prev = now[PREV]
  ans[now[POS]] = min_dismiss[now[POS]] + 1
  min_dismiss[nxt[POS]] = max(min_dismiss[nxt[POS]], ans[now[POS]])
  min_dismiss[prev[POS]] = max(min_dismiss[prev[POS]], ans[now[POS]])
  nxt[PREV] = prev
  prev[NEXT] = nxt
  lst[SIZE] -= 1

lst = [0, None, None]
  
with open('input.txt', 'r') as fin:
  n = int(fin.readline())
  a = list(map(int, fin.readline().split()))
  ans = [0] * n
  min_dismiss = [0] * n
  for i in range(len(a)):
    push_back(lst, a[i], i)
  lst[TAIL][NEXT] = lst[HEAD]
  lst[HEAD][PREV] = lst[TAIL]
  now = lst[HEAD]
  last_upd = lst[HEAD][POS]
  while True:
    if now[PREV][KEY] > now[KEY] < now[NEXT][KEY] and now[NEXT] != now[PREV]:
      delete(lst, now)
      now = now[PREV]
      last_upd = now[POS]
    else:
      now = now[NEXT]
      if now[POS] == last_upd:
        break
  print(*ans)