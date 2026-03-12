# Write function that computes the digital root of a given integer


def digital_root(n: int) -> int:
    return n if n < 10 else digital_root(sum(int(digit) for digit in str(n)))
n = int(input())
print(digital_root(n))

