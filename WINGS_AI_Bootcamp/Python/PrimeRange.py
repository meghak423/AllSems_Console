def factorize(n: int) -> list[int]:
    factors = []
    while n % 2 == 0:
        factors.append(2)
        n //= 2
    r = 3
    while r * r <= n:
        while n % r == 0:
            factors.append(r)
            n //= r
        r += 2
    if n > 1:
        factors.append(n)
    return factors