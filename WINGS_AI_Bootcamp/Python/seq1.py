''' 6. WAP a number getting from subtracting the largest num and smallest num from given digits.Generate sequence like this.
1729 - num
9721 - 1279 = 8442
8442 - 2448 = 5994
i need a sequence like this 1729 8442 5994 and so on as output 
'''

def num_to_digits(n: int) -> list[int]:
	return [int(_) for _ in str(n)]
def digits_to_num(digits: list[int]) -> int:
	return int(''.join(str(_) for _ in digits))
def largest(n:int) -> int:
	return digits_to_num(sorted(num_to_digits(n), reverse=True))
def smallest(n:int) -> int:
	return digits_to_num(sorted(num_to_digits(n)))
def next_kaprekar(n:int) -> int:
	return largest(n) - smallest(n)
def kaprekar_seq(n:int) -> list[int]:
	seq =[]
	while n not in seq:
		seq.append(n)
		n = next_kaprekar(n)
	return seq
result = kaprekar_seq(int(input()))
print(result)

