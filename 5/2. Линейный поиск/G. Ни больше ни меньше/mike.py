from tests.index import test, input
test(0)

__input__ = input
def input():
  try: return __input__()
  except: return None


for _ in range(int(input())):
  n = int(input())
  a = list(map(int, input().split()))
  
  ans, prevbreak, curmin = [], 0, n
  
  
  for i in range(n):
    curmin = min(curmin, a[i])

    if curmin > i - prevbreak: continue
      
    ans.append(i - prevbreak)
    prevbreak = i
    curmin = a[i]
    
  
  ans.append(n - prevbreak)
  print(len(ans))
  print(*ans)