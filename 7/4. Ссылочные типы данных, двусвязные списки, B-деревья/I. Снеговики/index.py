from tests.index import test, input
test(6)

n = int(input())

parents = [0]
weights = [0]

for i in range(n):
  t, m = map(int, input().split())
  if m:
    parents.append(t)
    weights.append(weights[t] + m)
  else:
    pt = parents[t]
    parents.append(parents[pt])
    weights.append(weights[pt])
   
print(sum(weights))