''' Collatz senquence
   160,80,40,20,10,5,16,8,4,2,1,4,2,1.....
   
'''

def collatz_sequence(n: int) -> list[int]:
    sequence = []
    while n != 1:
        sequence.append(n)
        if n % 2 == 0:
            n //= 2  
        else:
            n = 3 * n + 1  
    sequence.append(1) 
    sequence.extend([4,2,1])
    return sequence
n = int(input())
result = collatz_sequence(n)
print("Collatz Sequence: ", result)

