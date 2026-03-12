def check_winner(board, player):
  
    for i in range(3):
        if all(board[i][j] == player for j in range(3)) or \
           all(board[j][i] == player for j in range(3)):
            return True
    if board[0][0] == player and board[1][1] == player and board[2][2] == player:
        return True
    if board[0][2] == player and board[1][1] == player and board[2][0] == player:
        return True
    return False

def tic_tac_toe(board):
    x_count = sum(row.count('X') for row in board)
    o_count = sum(row.count('0') for row in board)

    if not (x_count == o_count or x_count == o_count + 1):
        print("illegal")
        return

    if check_winner(board, 'X'):
        if x_count == o_count + 1:
            print("the first player won")
        else:
            print("illegal")
        return
    if check_winner(board, '0'):
        if x_count == o_count:
            print("the second player won")
        else:
            print("illegal")
        return

    if x_count + o_count == 9:
        print("draw")
    elif x_count == o_count:
        print("first")
    else:
        print("second")

board = [input().strip() for _ in range(3)]

tic_tac_toe(board)
