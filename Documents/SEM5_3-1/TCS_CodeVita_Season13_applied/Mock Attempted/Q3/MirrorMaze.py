dx = [-1, 0, 1, 0]  # up, right, down, left
dy = [0, 1, 0, -1]

mirror_change = {
    '/': [1, 0, 3, 2],
    '\\': [3, 2, 1, 0]
}

def in_bounds(x, y, M, N):
    return 0 <= x < M and 0 <= y < N

def max_loop(grid, M, N):
    visited = [[[False]*4 for _ in range(N)] for _ in range(M)]
    max_len = 0
    for i in range(M):
        for j in range(N):
            if grid[i][j] in ('/', '\\'):
                for d in range(4):
                    if visited[i][j][d]:
                        continue
                    x, y, dir = i, j, d
                    path = {}
                    length = 0
                    while True:
                        if not in_bounds(x, y, M, N):
                            break
                        if (x, y, dir) in path:
                            max_len = max(max_len, length - path[(x, y, dir)])
                            break
                        path[(x, y, dir)] = length
                        visited[x][y][dir] = True
                        length += 1
                        if grid[x][y] in ('/', '\\'):
                            dir = mirror_change[grid[x][y]][dir]
                        x += dx[dir]
                        y += dy[dir]
    return max_len

# Input
M, N = map(int, input().split())
grid = [input().split() for _ in range(M)]

# Output exactly as required: single integer, no extra spaces/newlines
result = max_loop(grid, M, N)
print(result, end='')  # Using end='' avoids extra newline
