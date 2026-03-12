def check_symmetric(matrix):
    for i in range(3):
        for j in range(3):
            if matrix[i][j] != matrix[2 - i][2 - j]:
                return "NO"
    return "YES"

matrix = [input().strip() for _ in range(3)]

print(check_symmetric(matrix))
