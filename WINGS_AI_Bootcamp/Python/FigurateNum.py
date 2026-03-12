def sq(num: int) -> bool:
    return num == (num ** 0.5) ** 2
def cube(num: int) -> bool:
    c = round(num ** (1/3))
    return num == c ** 3
def power(num: int) -> bool:
    return num > 0 and (num & (num-1)) == 0

print(sq(4))
print(cube(27))
print(power(4))