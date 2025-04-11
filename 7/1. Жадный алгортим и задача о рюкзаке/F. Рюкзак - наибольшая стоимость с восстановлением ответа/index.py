from tests.index import test, input
test(7)
  

n, m = map(int, input().split())
weights = list(map(int, input().split()))
costs = list(map(int, input().split()))

d = [0] + [-1] * m
p = [[]] + [[]] * m
    
for i in range(n):
  w, c = weights[i], costs[i]
  for j in range(m - w, -1, -1):
    if d[j] != -1 and d[j + w] < d[j] + c:
      d[j + w] = d[j] + c
      p[j + w] = p[j][:] + [i]
      
best, weight = -1, -1
for w in range(m, -1, -1):
  if d[w] > best:
    best, weight = d[w], w
 

print('\n'.join(map(lambda i: str(i + 1), p[weight])))
# w, j = p[j]
# ans = []   
# while w != -1:
#   ans.append(w + 1)
#   w, j = p[j]
  
# print(len(ans))
# print('\n'.join(map(str, ans[::-1])))