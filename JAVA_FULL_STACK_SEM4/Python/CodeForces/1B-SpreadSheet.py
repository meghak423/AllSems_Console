import re

def col_to_num(col):
    num = sum((ord(c) - 64) * (26 ** i) for i, c in enumerate(col[::-1]))
    return num

def num_to_col(num):
    col = ""
    while num:
        num, r = divmod(num - 1, 26)
        col = chr(65 + r) + col
    return col

n = int(input())
for _ in range(n):
    s = input()
    if 'R' in s and 'C' in s and s[1:s.index('C')].isdigit():
        r, c = map(int, re.findall(r'\d+', s))
        print(f"{num_to_col(c)}{r}")
    else:
        col, row = re.match(r'([A-Z]+)(\d+)', s).groups()
        print(f"R{row}C{col_to_num(col)}")
