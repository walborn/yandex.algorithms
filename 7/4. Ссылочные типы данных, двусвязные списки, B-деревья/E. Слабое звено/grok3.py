from tests.index import test, input
test(14)

n = int(input())
values = list(map(int, input().split()))

players = [[values[i], 0] for i in range(n)]
playing = set(range(n))

rnd = 1
while len(playing) > 2:
  weak = set()
  strong = list(playing)
  for r in range(len(strong)):
    l, m = r - 2, r - 1
    left, middle, right = strong[l], strong[m], strong[r]
    if players[left][0] > players[middle][0] and players[right][0] > players[middle][0]:
      weak.add(middle)
  
  if not weak: break
  
  for i in weak: players[i][1] = rnd

  playing -= weak
  
  rnd += 1

print(*[player[1] for player in players])