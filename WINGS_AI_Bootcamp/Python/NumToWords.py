# Number to words converter - American and Indian numbering systems

ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"]
TEENS = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
         "Sixteen", "Seventeen", "Eighteen", "Nineteen"]
TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]

def two_digit(num):
    if num == 0:
        return ""
    elif num < 10:
        return ONES[num]
    elif 10 <= num < 20:
        return TEENS[num - 10]
    else:
        return TENS[num // 10] + (" " + ONES[num % 10] if num % 10 != 0 else "")

def three_digit(num):
    hundred = num // 100
    rest = num % 100
    res = ""
    if hundred > 0:
        res += ONES[hundred] + " Hundred"
        if rest > 0:
            res += " "
    if rest > 0:
        res += two_digit(rest)
    return res

# American system scales
AMERICAN_SCALE = ["", "Thousand", "Million", "Billion", "Trillion"]

def num_to_words_american(num):
    if num == 0:
        return "Zero"
    words = []
    i = 0
    while num > 0:
        part = num % 1000
        if part > 0:
            segment = three_digit(part)
            if AMERICAN_SCALE[i]:
                segment += " " + AMERICAN_SCALE[i]
            words.append(segment.strip())
        num //= 1000
        i += 1
    return " ".join(words[::-1]).strip()

# Indian system scales
INDIAN_SCALE = ["", "Thousand", "Lakh", "Crore", "Arab"]

def num_to_words_indian(num):
    if num == 0:
        return "Zero"
    words = []
    # first 3 digits
    part = num % 1000
    words.append(three_digit(part))
    num //= 1000
    i = 1
    while num > 0 and i < len(INDIAN_SCALE):
        part = num % 100
        if part > 0:
            segment = two_digit(part)
            if INDIAN_SCALE[i]:
                segment += " " + INDIAN_SCALE[i]
            words.append(segment.strip())
        num //= 100
        i += 1
    return " ".join(filter(None, words[::-1])).strip()

# Testing

print("American System:")
print(num_to_words_american(123456789))
print(num_to_words_american(1000100))
print(num_to_words_american(0))

print("\nIndian System:")
print(num_to_words_indian(123456789))
print(num_to_words_indian(1000100))
print(num_to_words_indian(0))
