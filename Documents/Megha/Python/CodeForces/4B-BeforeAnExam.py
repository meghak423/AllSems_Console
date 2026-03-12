def before_exam(d, sumTime, times):
    min_time_sum = sum(minTime for minTime, _ in times)
    max_time_sum = sum(maxTime for _, maxTime in times)
    
    if sumTime < min_time_sum or sumTime > max_time_sum:
        return "NO"
    
    schedule = [minTime for minTime, _ in times]
    remaining_time = sumTime - min_time_sum
    
    for i in range(d):
        minTime, maxTime = times[i]
        max_possible_add = maxTime - minTime
        add_time = min(remaining_time, max_possible_add)
        schedule[i] += add_time
        remaining_time -= add_time
    
    if remaining_time > 0:
        return "NO"
    
    return "YES", schedule

d, sumTime = map(int, input().split())
times = [tuple(map(int, input().split())) for _ in range(d)]

result = before_exam(d, sumTime, times)
if result == "NO":
    print(result)
else:
    print(result[0])
    print(" ".join(map(str, result[1])))
