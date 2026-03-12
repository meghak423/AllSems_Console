def largest_prime_factor(n: int) -> int:
    largest_factor = -1

    # Divide out 2s
    while n % 2 == 0:
        largest_factor = 2
        n //= 2

    # Divide out odd factors
    factor = 3
    while factor * factor <= n:
        while n % factor == 0:
            largest_factor = factor
            n //= factor
        factor += 2

    # If remaining n is prime and > 2
    if n > 2:
        largest_factor = n

    return largest_factor

# Example usage
print(largest_prime_factor(315))  # Output: 7