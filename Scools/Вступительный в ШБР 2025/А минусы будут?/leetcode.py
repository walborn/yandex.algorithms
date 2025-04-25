from tests.index import test, input
test(4)

def calculate(s):
  val = 0
  ans = 0
  sign = 1
  stack = []

  for c in s:
    if c.isdigit():
      val = val * 10 + int(c)
    elif c in '+-':
      ans += val * sign
      sign = -1 if c == '-' else 1
      val = 0
    elif c == '(':
      stack.append(ans)
      stack.append(sign)
      ans = 0
      sign = 1
    elif c == ')':
      ans += sign * val
      ans *= stack.pop()
      ans += stack.pop()
      val = 0

  return ans + val * sign

print(calculate(input().replace(' ', '').replace('--', '')))
