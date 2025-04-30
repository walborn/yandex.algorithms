from tests.index import test, input
test(1)

apps = []
for _ in range(int(input())):
  action = input()
  if action.startswith('Alt'):
    i = ((len(action) - 3) >> 2) % len(apps)
    if i: apps.append(apps.pop(-i - 1))
  else:
    apps.append(action[4:])
  
  print(apps[-1])