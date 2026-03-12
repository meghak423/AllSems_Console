def pascals_triangle(n: int):
    triangle = []
    for i in range(n):
        row = [1]
        if triangle:
            row += [triangle[-1][j] + triangle[-1][j+1] for j in range(len(triangle[-1]) - 1)] + [1]
        triangle.append(row)
    return triangle

def print_pascals_triangle(n: int):
    triangle = pascals_triangle(n)
    max_width = len('   '.join(map(str, triangle[-1])))

    for row in triangle:
        row_str = '   '.join(map(str, row))
        print(row_str.center(max_width))

print_pascals_triangle(6)
