def registration_system(n, requests):
    name_count = {}
    
    result = []
    for name in requests:
        if name not in name_count:
            name_count[name] = 1  
            result.append("OK")
        else:
            new_name = name + str(name_count[name])
            result.append(new_name)
            name_count[name] += 1
    
    return result

n = int(input())
requests = [input().strip() for _ in range(n)]

result = registration_system(n, requests)
for res in result:
    print(res)
