# 5. Write function to check whether given num is power of 2 or not.


def powerOf2(number: int) -> bool:
	if number <= 0:
		return False
	while number % 2 == 0:
		number = number // 2
	return number == 1
number = int(input())
print(powerOf2(number))
