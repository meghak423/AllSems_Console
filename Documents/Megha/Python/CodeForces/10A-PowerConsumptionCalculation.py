def calculate_power_consumption(n, P1, P2, P3, T1, T2, work_periods):
    total_power = 0
    last_time = 0  

    for i in range(n):
        li, ri = work_periods[i]
        
        total_power += (ri - li) * P1
        
        if last_time > 0:
            idle_time = li - last_time  
            if idle_time <= T1:
                total_power += idle_time * P1  
            elif idle_time <= T1 + T2:
                total_power += T1 * P1  
                total_power += (idle_time - T1) * P2  
            else:
                total_power += T1 * P1  
                total_power += T2 * P2  
                total_power += (idle_time - T1 - T2) * P3  
        
        last_time = ri
    
    return total_power

n, P1, P2, P3, T1, T2 = map(int, input().split())
work_periods = [tuple(map(int, input().split())) for _ in range(n)]

result = calculate_power_consumption(n, P1, P2, P3, T1, T2, work_periods)
print(result)
