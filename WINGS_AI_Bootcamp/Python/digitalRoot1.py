# Write function that computes the digital root of a given integer

def digital_root(n: int) -> int:
	if n == 0:
		return 0
	else:
		return 1 + (n-1) % 9
n = int(input())
print(digital_root(n))


''' Adding a num to 9 is equal to 
	adding 1 to ten's digit and adding 1 to one's digit
'''
