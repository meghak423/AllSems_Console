HASH, PLUS, SPACE = "#", "+", " "
LF = "\n"
WIDTH = 60

def pattern(size: int) -> list[str]:
    return [line(i) for i in range(size)]

def line(k: int) -> str:
    if k == 0:
        return HASH
    else:
        middle = [PLUS] * (2 * k - 1)
        full = [HASH] + middle + [HASH]
        return "  ".join(full)

def Hash_pyramid(size: int) -> str:
    return LF.join(line(k).center(WIDTH) for k in range(size))

print(Hash_pyramid(4))
