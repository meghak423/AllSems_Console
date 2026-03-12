def aliquot_sum(n: int) -> int:
    return sum(i for i in range(1, n) if n % i == 0)

n = int(input())
print(aliquot_sum(n))
