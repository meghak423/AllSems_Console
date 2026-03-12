from collections import defaultdict
import sys

sys.setrecursionlimit(10000)

def solve():
    n = int(sys.stdin.readline().strip())
    
    recipes = defaultdict(list)
    for _ in range(n):
        line = sys.stdin.readline().strip()
        if not line:
            continue
        left, right = line.split("=")
        potion = left.strip()
        ingredients = right.strip().split("+")
        recipes[potion].append(ingredients)
    
    target = sys.stdin.readline().strip()
    
    memo = {}
    visiting = set()
    
    def min_orbs(potion):
        if potion in memo:
            return memo[potion]
        if potion not in recipes:
            memo[potion] = 0
            return 0
        if potion in visiting:
            return float('inf')
        
        visiting.add(potion)
        best_cost = float('inf')
        
        for recipe in recipes[potion]:
            base_cost = len(recipe) - 1
            total_cost = base_cost
            valid = True
            for ing in recipe:
                c = min_orbs(ing)
                if c == float('inf'):
                    valid = False
                    break
                total_cost += c
            if valid:
                best_cost = min(best_cost, total_cost)
        
        visiting.remove(potion)
        memo[potion] = best_cost
        return best_cost
    
    result = min_orbs(target)
    
    if result == float('inf'):
        print(-1, end="")  # ensure no newline issues
    else:
        print(result, end="")  # ensure no extra spaces/newlines


if __name__ == "__main__":
    solve()
