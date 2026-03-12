from collections import deque

def solve():
    n, k = map(int, input().split())
    heights = list(map(int, input().split()))
    
    left = 0
    max_books = 0
    periods = []
   
    min_deque = deque()
    max_deque = deque()
    
    for right in range(n):
     
        while min_deque and heights[min_deque[-1]] >= heights[right]:
            min_deque.pop()
        min_deque.append(right)
        
        while max_deque and heights[max_deque[-1]] <= heights[right]:
            max_deque.pop()
        max_deque.append(right)
        
        while heights[max_deque[0]] - heights[min_deque[0]] > k:
            left += 1
            if min_deque[0] < left:
                min_deque.popleft()
            if max_deque[0] < left:
                max_deque.popleft()
        
        window_size = right - left + 1
        if window_size > max_books:
            max_books = window_size
            periods = [(left + 1, right + 1)]  
        elif window_size == max_books:
            periods.append((left + 1, right + 1))
    
    print(max_books, len(periods))
    for period in periods:
        print(period[0], period[1])

solve()
