def sieve_of_eratosthenes(n: int) -> list[int]:
    sieve = [True] * (n + 1)
    sieve[0], sieve[1] = False, False

    p = 2
    while p * p <= n:
        if sieve[p]:
            for i in range(p * p, n + 1, p):
                sieve[i] = False
        p += 1

    return [i for i, prime in enumerate(sieve) if prime]

# Example: primes up to 30
print(sieve_of_eratosthenes(30))