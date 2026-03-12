def fair_rations(B):
    count = 0
    B = B[:]  # copy list to avoid mutation if needed
    for i in range(len(B) - 1):
        if B[i] % 2 != 0:
            B[i] += 1
            B[i+1] += 1
            count += 2
    if all(x % 2 == 0 for x in B):
        return count
    else:
        return "NO"

# Example
B = [2, 3, 4, 5, 6]
print(fair_rations(B))  # Output: 4
