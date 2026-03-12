''' 4. Amount rounded to the nearest 5 rupee amount
  Ex: 42 rupees 73 paise = 45
'''

def roundto5(amt: float) -> int:
	change = amt % 5
	fives = change // 5
	threshold = 2.5
	if change >= threshold:
		return 5 * (fives + 1)
	else:
		return fives * 5

def nearest(amt: float, denom: int) -> int:
	threshold = denom / 2
	how_many = amt // denom
	if amt * denom < threshold:
		return how_many * denom
	else:
		return ( 1 + how_many) * denom
		
def nearest_to(amt: float, denom: int) -> int:	
	return int(0.5 + amt/denom) * denom	

amt = float(input())
print(roundto5(amt))

amt = float(input())
denom= 5
print(roundto5(nearest(amt,denom)))

amt = float(input())
denom = 10
print(roundto5(nearest(amt,denom)))

