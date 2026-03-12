# Generate Pascals Triangle
'''
                            1
                        1       1
                    1       2       1
                1       3       3       1
            1       4       6       4       1
        1       5       10      10      5       1

'''
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
    max_width = len('   '.join(map(str, triangle[-1])))  # width of last row string

    for row in triangle:
        row_str = '   '.join(map(str, row))
        print(row_str.center(max_width))

print_pascals_triangle(5)