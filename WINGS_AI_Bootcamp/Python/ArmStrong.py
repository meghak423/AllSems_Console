def is_armstrong(n: int) -> bool:
    digits = [int(d) for d in str(n)]
    power = len(digits)
    return n == sum(d ** power for d in digits)

n = int(input())
print(is_armstrong(n))
