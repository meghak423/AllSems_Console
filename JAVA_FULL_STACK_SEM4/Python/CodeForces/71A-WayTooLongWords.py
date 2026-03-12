def tooLongWords(s):
    n = len(s)
    if n>10:
        print(s[0] + str(n-2) + s[n-1])
    else :
        print(s)

    
t = int(input())
while(t > 0):
    t -= 1
    s = input()
    tooLongWords(s)
    