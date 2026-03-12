import math

n, m, a = map(int, input().split())
num_flag_length = math.ceil(n / a)
num_flag_width = math.ceil(m / a)
result = num_flag_length * num_flag_width

print(result)