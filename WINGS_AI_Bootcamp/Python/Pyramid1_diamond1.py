# ASOKAN

STAR, SPACE = "*", " "
LF = "\n"
START, REPEAT, STOP = STAR, STAR + STAR, ''
WIDTH = 60

def pattern(size: int) -> list[str]:
    return [line(i) for i in range(size)]

def line(k: int) -> str:
    return start(START, k) + repeat(REPEAT, k) + stop(STOP, k)

def start(atom: str, k: int) -> str:
    return atom

def repeat(atom: str, k: int) -> str:
    return k * atom

def stop(atom: str, k: int) -> str:
    return atom

def make_pyramid(size: int) -> str:
    return LF.join(line.center(WIDTH) for line in pattern(size))

def make_diamond(size: int) -> str:
    half = size // 2 if size % 2 == 0 else (size + 1) // 2
    diamond = pattern(half) + pattern(size - half)[::-1]
    return LF.join(line.center(WIDTH) for line in diamond)

print(make_pyramid(7))
print(make_diamond(8))



