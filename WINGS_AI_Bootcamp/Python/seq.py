''' 6. WAP a number getting from subtracting the largest num and smallest num from given digits.Generate sequence like this.
1729 - num
9721 - 1279 = 8442
8442 - 2448 = 5994
i need a sequence like this 1729 8442 5994 and so on as output 
'''


def generate_sequence(num):
    sequence = [num]  
    while True:
        digits = sorted(str(num))
        smallest = int(''.join(digits))           
        largest = int(''.join(digits[::-1]))      
        num = largest - smallest
        sequence.append(num) 
        if num == 0 or num == sequence[-2]:  
            break
    print(" ".join(map(str, sequence)))
number = int(input("Enter a number: "))
generate_sequence(number)

