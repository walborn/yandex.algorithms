from tests.test import test, input
test(1)

d, n = map(int, input().split())

players = [list(map(int, input().split())) for _ in range(n)]

eps = 0.000001

def point_in_circle(x, y, u, v, r):
  return (x - u) ** 2 + (y - v) ** 2 < r ** 2 + eps

def check_rect(xl, yl, xr, yr, time):
  if not any(point_in_circle(0, 0, x, y, d) for x, y in [(xl, yl), (xl, yr), (xr, yl), (xr, yr)]):
    return False, 0, 0

  if xr - xl < eps:
    return True, (xl + xr) / 2, (yl + yr) / 2

  for x, y, v in players:
    if all(point_in_circle(x, y, px, py, v * time) for px, py in [(xl, yl), (xl, yr), (xr, yl), (xr, yr)]):
      return False, 0, 0

  xm, ym = (xl + xr) / 2, (yl + yr) / 2

  for coord in [(xl, yl, xm, ym), (xl, ym, xm, yr), (xm, yl, xr, ym), (xm, ym, xr, yr)]:
    quarter = check_rect(*coord, time)
    if quarter[0]:
      return quarter

  return False, 0, 0

def check(time):
  return check_rect(-d, 0, d, d, time)

l = 0
r = 4 * d

while r - l > eps:
  m = (l + r) / 2
  if check(m)[0]:
    l = m
  else:
    r = m

print(l)
print(*check(l)[1:])