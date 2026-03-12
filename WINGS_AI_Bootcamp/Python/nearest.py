''' 4. Amount rounded to the nearest 5 rupee amount
  Ex: 42 rupees 73 paise = 45
'''

def round_to_nearest5(amount: float) -> float:
    return (amount + 2) // 5 * 5  
amount = int(input())
round_amount = round_to_nearest5(amount)
print(round_amount)

