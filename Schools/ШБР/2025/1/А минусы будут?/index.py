from tests.index import test, input
test(2)

def calculate(s):
  s = s.replace(' ', '')
  ans = 0
  val = 0
  sign = 1
  stack = [sign]

  for c in s:
    if c.isdigit():
      val = 10 * val + int(c)
    elif c == ')':
      stack.pop()
    elif c == '(':
      stack.append(sign)
    elif c == '+':
      ans += stack[-1] * val
      val = 0
    elif c == '-':
      sign = -sign
      ans += sign * stack[-1] * val
      val = 0
  return ans + sign * val

print(calculate(input()))