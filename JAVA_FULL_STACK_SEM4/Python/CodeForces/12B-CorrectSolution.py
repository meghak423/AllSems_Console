def smallest_number(n):
    digits = sorted(str(n))
    if digits[0] == '0':
        for i in range(1, len(digits)):
            if digits[i] != '0':
                digits[0], digits[i] = digits[i], '0'
                break
    return ''.join(digits)

n = input().strip()
m = input().strip()

smallest = smallest_number(n)
if smallest == m:
    print("OK")
else:
    print("WRONG_ANSWER")
