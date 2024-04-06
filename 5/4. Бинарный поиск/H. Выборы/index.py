from tests.test import test, input
test(1)
 
n = int(input())

parties = []
for i in range(n):
  input_values = list(map(int, input().split()))
  parties.append(input_values + [i])
parties.sort(key=lambda x: x[0])

votes = []
bribes = []
keys = []

for vote, bribe, key in parties:
  votes.append(vote)
  bribes.append(bribe)
  keys.append(key)

suffixsum = list(votes)
for i in range(n - 2, -1, -1):
  suffixsum[i] += suffixsum[i + 1]

def binary_search(l, r, check):
  while l < r:
    m = (l + r) // 2
    if check(m):
      r = m
    else:
      l = m + 1
  return l

def rbinary_search(l, r, check):
  while l < r:
    m = (l + r + 1) // 2
    if check(m):
      r = m - 1
    else:
      l = m
  return l

def above(i, level):
  j = binary_search(0, len(votes) - 1, lambda x: votes[x] > level)

  if j == len(votes):
    return 0

  result = suffixsum[j] - level * (len(votes) - j) - max(0, votes[i] - level)
  return result

def solve(i):
  def check(m):
    return votes[i] + above(i, m) <= m

  level = rbinary_search(0, votes[-1], check)

  cost = above(i, level)

  votesback = max(0, votes[i] + cost - (level + 2))

  return cost - votesback, level, votesback

mincost = float('inf')
ans = []

for i in range(n):
  if bribes[i] == -1:
    continue

  cost, level, votesback = solve(i)

  if bribes[i] + cost < mincost:
    mincost = bribes[i] + cost
    ans = [i, cost, level, votesback]

winner, cost, level, votesback = ans

for i in range(n):
  if i == winner:
    votes[winner] += cost
  elif votes[i] > level:
    votes[i] = level
    if votesback > 0:
      votes[i] += 1

parties = [[keys[i], votes[i]] for i in range(n)]
votes = [x[1] for x in sorted(parties, key=lambda x: x[0])]

print(mincost)
print(keys[winner] + 1)
print(*votes)