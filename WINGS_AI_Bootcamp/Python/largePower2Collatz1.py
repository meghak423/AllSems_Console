# 3. Given an integer return the largest power of 2 from collatz sequence.

def is_p2(n: int) -> bool:
    return n > 0 and (n & (n - 1)) == 0

def next_collatz(n: int) -> int:
    return 3 * n + 1 if n % 2 != 0 else n // 2

def collatz_power2(n: int) -> int:
    if n in [1, 2, 4]:
        return 4
    elif is_p2(n):
        return n
    else:
        return collatz_power2(next_collatz(n))
n = int(input())
print(collatz_power2(n))

