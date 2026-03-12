''' Collatz senquence
   160,80,40,20,10,5,16,8,4,2,1,4,2,1.....
   
'''

def next_collatz(k: int) -> int:
	return k // 2 if k%2 == 0 else 3*k + 1
def collatz(n: int) -> list[int]:
	if n == 4:
		return [4,2,1]
	else:
		return [n] + collatz(next_collatz(n))
print(collatz(7))
