import math
Y, W = map(int, input().split())
max_roll = max(Y, W)
favorable_outcomes = 7 - max_roll
total_outcomes = 6

gcd_value = math.gcd(favorable_outcomes, total_outcomes)

numerator = favorable_outcomes // gcd_value
denominator = total_outcomes // gcd_value

print(f"{numerator}/{denominator}")
