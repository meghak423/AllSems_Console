from collections import defaultdict, deque

def derive_passcode(attempts):
    graph = defaultdict(set)
    indegree = defaultdict(int)
    digits = set()

    for attempt in attempts:
        digits.update(attempt)
        for i in range(len(attempt) - 1):
            if attempt[i+1] not in graph[attempt[i]]:
                graph[attempt[i]].add(attempt[i+1])
                indegree[attempt[i+1]] += 1

    queue = deque([d for d in digits if indegree[d] == 0])
    result = ''

    while queue:
        node = min(queue)
        queue.remove(node)
        result += node
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)
    return result

attempts = [
    "319", "680", "180", "690", "129", "620", "762", "689",
    "762", "318", "368", "710", "720", "710", "629", "168",
    "160", "689", "716", "731", "736", "729", "316", "729",
    "729", "710", "769", "290", "719", "680", "318", "389",
    "162", "289", "162", "718", "729", "319", "790", "680",
    "890", "362", "319", "760", "316", "729", "380", "319",
    "728", "716"
]

print("Derived passcode:", derive_passcode(attempts))
