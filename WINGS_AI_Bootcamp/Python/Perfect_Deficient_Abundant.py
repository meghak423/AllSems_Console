def aliquot_sum(n: int) -> int:
    return sum(i for i in range(1, n) if n % i == 0)

def classify(n: int) -> str:
    s = aliquot_sum(n)
    if s == n:
        return "Perfect"
    elif s < n:
        return "Deficient"
    else:
        return "Abundant"

n = int(input())
print(classify(n))
