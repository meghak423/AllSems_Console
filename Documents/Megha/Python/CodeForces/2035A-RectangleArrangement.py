import sys
input = sys.stdin.read
 
data = input().splitlines()
t = int(data[0])
result = []
 
idx = 1
for _ in range(t):
    n = int(data[idx])
    maxw = maxh = 0
    idx += 1
    for _ in range(n):
        w, h = map(int, data[idx].split())
        maxw = max(maxw, w)
        maxh = max(maxh, h)
        idx += 1
    result.append(str(2 * (maxw + maxh)))
 
sys.stdout.write("\n".join(result) + "\n")