from collections import defaultdict
from math import gcd

def on_segment(x1, y1, x2, y2, px, py):
    return (min(x1, x2) <= px <= max(x1, x2) and 
            min(y1, y2) <= py <= max(y1, y2))

def line_intersection(l1, l2):
    x1, y1, x2, y2 = l1
    x3, y3, x4, y4 = l2
    denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    if denom == 0:
        return None
    px = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denom
    py = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denom
    if on_segment(x1, y1, x2, y2, px, py) and on_segment(x3, y3, x4, y4, px, py):
        return (round(px, 6), round(py, 6))
    return None

def distance_in_cells(x1, y1, x2, y2):
    return gcd(abs(x1 - x2), abs(y1 - y2))

def main():
    N = int(input().strip())
    lines = [tuple(map(int, input().split())) for _ in range(N)]
    K = int(input().strip())
    
    stars = defaultdict(set)
    for i in range(N):
        for j in range(i + 1, N):
            p = line_intersection(lines[i], lines[j])
            if p:
                stars[p].add(i)
                stars[p].add(j)
    
    total_intensity = 0
    for (sx, sy), l_indices in stars.items():
        if len(l_indices) == K:
            all_counts = []
            for idx in l_indices:
                x1, y1, x2, y2 = lines[idx]
                if (sx, sy) == (x1, y1) or (sx, sy) == (x2, y2):
                    other = (x2, y2) if (sx, sy) == (x1, y1) else (x1, y1)
                    cnt = distance_in_cells(int(sx), int(sy), other[0], other[1])
                    all_counts.append(cnt)
                else:
                    cnt1 = distance_in_cells(int(sx), int(sy), x1, y1)
                    cnt2 = distance_in_cells(int(sx), int(sy), x2, y2)
                    all_counts.append(cnt1)
                    all_counts.append(cnt2)
            if all_counts:
                total_intensity += min(all_counts)
    
    # Print only the integer, no extra spaces/newlines
    print(total_intensity if total_intensity > 0 else 0, end="")

if __name__ == "__main__":
    main()
