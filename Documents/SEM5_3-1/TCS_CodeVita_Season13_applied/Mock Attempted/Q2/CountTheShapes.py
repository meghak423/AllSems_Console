from collections import defaultdict
import sys

def solve():
    n = int(sys.stdin.readline().strip())
    
    edges = []
    graph = defaultdict(list)
    
    for _ in range(n):
        x1, y1, x2, y2 = map(int, sys.stdin.readline().split())
        p1, p2 = (x1, y1), (x2, y2)
        edges.append((p1, p2))
        graph[p1].append(p2)
        graph[p2].append(p1)
    
    visited = set()
    
    def dfs(node):
        stack = [node]
        while stack:
            u = stack.pop()
            if u in visited:
                continue
            visited.add(u)
            for v in graph[u]:
                if v not in visited:
                    stack.append(v)
    
    # Count connected components
    components = 0
    for v in graph:
        if v not in visited:
            dfs(v)
            components += 1
    
    V = len(graph)        # number of vertices
    E = len(edges)        # number of edges
    
    # Euler's formula for planar graphs: F = E - V + C + 1
    faces = E - V + components + 1
    
    # Closed figures = faces - outer face
    closed_shapes = max(0, faces - 1)
    
    print(closed_shapes, end="")

if __name__ == "__main__":
    solve()
