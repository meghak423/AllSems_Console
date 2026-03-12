t = int(input())
for _ in range(t):
    n = int(input())
    A = list(map(int, input().split()))
    best = 0
    for i in range(n):
        curr = 0
        for j in range(i, n):
            if A[j] <= A[i]:
                curr += 1
        best = max(best, curr)
    print(n - best)
