# 3. Given an integer return the largest power of 2 from collatz sequence.

def is_power_of2(num: int) -> int:
	return num > 0 and num & (num - 1) == 0
	
def largest_powerOf2(num: int) -> int:
	largestPower = 0
	while num != 1:
		if is_power_of2(num):
			largestPower = max(largestPower, num)
		if num % 2 == 0:
			num = num // 2
		else:
			num = 3 * num + 1
	if is_power_of2(1):
		largestPower = max(largestPower, 1)
	return largestPower

num = int(input())
print(largest_powerOf2(num))
		
