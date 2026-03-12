def nimber(x, a):
    aprime = 0
    goodbit = False
    for bit in range(30, -1, -1):
        if x & (1 << bit):
            aprime *= 2
            if goodbit or (a & (1 << bit)):
                aprime += 1
        elif a & (1 << bit):
            goodbit = True
    
    for k in range(1, 31):
        if aprime == (1 << k) - 2:
            return 0
        if aprime == (1 << k) - 1:
            return k
        if aprime == (1 << k):
            return k + 1 if k % 2 == 0 else k - 1
        if (1 << k) < aprime <= (2 << k) - 3:
            return k + 1
    return -1

def main():
    t = int(input())
    for _ in range(t):
        n = int(input())
        A = list(map(int, input().split()))
        X = list(map(int, input().split()))
        curr = 0
        for i in range(n):
            curr ^= nimber(X[i], A[i])
        print("Alice" if curr else "Bob")

main()
