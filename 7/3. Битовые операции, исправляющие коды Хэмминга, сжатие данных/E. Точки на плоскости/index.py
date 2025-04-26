from tests.index import test, input
test(1)

i, j = map(int, input().split())
x, c = map(int, input().split())
print(i ^ j)
print(x ^ c)