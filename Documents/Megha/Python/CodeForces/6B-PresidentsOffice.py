def solve_presidents_office(n, m, president_color, office):
  
    adjacent_desks = set()

    for i in range(n):
        for j in range(m):
         
            if office[i][j] == president_color:

                for di, dj in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    ni, nj = i + di, j + dj
    
                    if 0 <= ni < n and 0 <= nj < m and office[ni][nj] != '.' and office[ni][nj] != president_color:
                        adjacent_desks.add(office[ni][nj])

    return len(adjacent_desks)

n, m, president_color = input().split()
n, m = int(n), int(m)
office = [input().strip() for _ in range(n)]

print(solve_presidents_office(n, m, president_color, office))
