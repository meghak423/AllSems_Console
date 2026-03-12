import random

# 30 random picks from 1 to 100
picks = [random.randint(1, 100) for _ in range(30)]
print(picks)

# Seeding
random.seed(42)
picks = [random.randint(1, 100) for _ in range(30)]
print(picks)

# Frequency count of digits 0-9 in 10^5 numbers
units = [random.randint(0, 9) for _ in range(10**5)]
print([units.count(i) for i in range(10)])

# Same for 10^7 numbers
units = [random.randint(0, 9) for _ in range(10**7)]
print([units.count(i) for i in range(10)])
print(sum(units) / 10**7)
