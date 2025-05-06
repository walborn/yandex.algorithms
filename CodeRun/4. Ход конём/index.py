from tests.index import test, input
test(2)
  
n, m = map(int, input().split())

board = [[0]*(m + 2) for _ in range(n + 2)]

board[1][1] = 1
for i in range(2, n + 1):
    for j in range(2, m + 1):
        board[i][j] = board[i-2][j-1] + board[i-1][j-2]

print(board[n][m])