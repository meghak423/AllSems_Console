def chocolate_game(n, times):
    i = 0  
    j = n - 1  
    alice_time = 0  
    bob_time = 0  
    a = 0 
    b = 0 
    
    while i <= j:
        if alice_time <= bob_time:
            alice_time += times[i]
            a += 1
            i += 1
        else:
            bob_time += times[j]
            b += 1
            j -= 1
    
    return a, b

n = int(input()) 
times = list(map(int, input().split()))  

a, b = chocolate_game(n, times)
print(a, b)
