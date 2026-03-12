MOD = 1000000007
inf = 1 << 30

def solve():
    t = int(input())
    for _ in range(t):
        n, m = map(int, input().split())
        A = list(map(int, input().split()))
        B = list(map(int, input().split()))
        
        nxt = [[0] * m for _ in range(n)]
        for k in range(m):
            r, sum = -1, 0
            for i in range(n):
                while r < n and sum <= B[k]:
                    r += 1
                    if r < n: sum += A[r]
                nxt[i][k] = r
                sum -= A[i]

        dp = [[(inf, 0)] * m for _ in range(n+1)]
        upd = [[[] for _ in range(m)] for _ in range(n+1)]
        
        upd[0][0].append((0, 0, 1))
        upd[1][0].append((1, 0, 1))

        for k in range(m):
            mp = {}
            for i in range(n+1):
                for t, move, count in upd[i][k]:
                    if t == 0:
                        a, b = mp.get(move, (0, 0))
                        a += 1
                        b = (b + count) % MOD
                        mp[move] = (a, b)
                    else:
                        a, b = mp.get(move, (0, 0))
                        a -= 1
                        b = (b + MOD - count) % MOD
                        if a == 0: del mp[move]
                        else: mp[move] = (a, b)

                if not mp: continue

                move, (a, b) = min(mp.items())
                dp[i][k] = (move, b)
                if i == n: continue

                if k < m-1:
                    upd[i][k+1].append((0, move, b))
                    upd[i+1][k+1].append((1, move, b))

                if nxt[i][k] > i:
                    upd[i+1][k].append((0, move + (m - k - 1), b))
                    if nxt[i][k] < n:
                        upd[nxt[i][k]+1][k].append((1, move + (m - k - 1), b))

        mp = {}
        for k in range(m):
            move, count = dp[n][k]
            mp[move] = (mp.get(move, 0) + count) % MOD
        
        move, count = min(mp.items(), default=(inf, 0))
        if move == inf:
            print("-1")
        else:
            print(move, count)

solve()
