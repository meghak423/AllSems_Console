def check_sequences(s, a, b):
   
    def check_forward():
        
        i = s.find(a)
        if i == -1:
            return False 
        j = s.find(b, i + len(a)) 
        return j != -1
    
    def check_backward():
        s_reversed = s[::-1]  
        i = s_reversed.find(a)
        if i == -1:
            return False 
        j = s_reversed.find(b, i + len(a))  
        return j != -1
    
    forward_possible = check_forward()
    backward_possible = check_backward()
    
    if forward_possible and backward_possible:
        return "both"
    elif forward_possible:
        return "forward"
    elif backward_possible:
        return "backward"
    else:
        return "fantasy"

s = input().strip()
a = input().strip()
b = input().strip()

print(check_sequences(s, a, b))
