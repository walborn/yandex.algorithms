from tests.index import test, input
test(20)
  
n, b = map(int, input().split())
a = list(map(int, input().split()))

queue, ans = 0, 0
for i in a:
  queue += i
  ans += queue
  queue -= min(queue, b)  
  
  
print(ans + queue)
