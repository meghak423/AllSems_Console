# 5. Write function to check whether given num is power of 2 or not.

def is_power2(n: int) -> bool:
	return n > 0 and (n & (n-1)) == 0

def isp2(n: int) -> bool:
		if n == 0:
			return False
		elif n == 1:
			return True
		elif n % 2 == 1:
			return False
		else:
			return isp2(n // 2)


