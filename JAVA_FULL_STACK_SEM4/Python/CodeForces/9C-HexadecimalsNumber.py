from collections import deque

def count_valid_numbers(n):
    queue = deque([1])
    count = 0
    
    while queue:
        num = queue.popleft()
        
        if num > n:
            continue
        
        count += 1 
        queue.append(num * 10)  
        queue.append(num * 10 + 1)  
    
    return count
n = int(input().strip())

print(count_valid_numbers(n))
