SPACE = " "
AND = "and"
HUN = "hundred"
def convert2digits(k: int) -> str:
    upto20 = ["", "One", "Two"," Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"]
    tens = ["","","Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
    if k < 20:
        return upto20[k]
    else:
        return tens[k // 10] + SPACE + upto20[k % 10]

def convert3digits(k: int) -> str:
    if k < 100:
        return convert2digits(k)
    else:
        h, tu = divmod(k, 100)
        if tu == 0:
            return convert2digits(k // 100) + SPACE + HUN
        else:
            return convert2digits(h) + SPACE + HUN + SPACE + AND + SPACE + convert2digits(tu)
    
print(convert3digits(671))



WESTERN =  { 10 ** 12 : "Trillion",10 ** 9 : "Billion", 10 ** 6 : "Million", 10 ** 3 : "Thousand", 1: ""}
INDIAN = {10 ** 9: "Arab", 10 ** 7 : "Crore", 10 ** 5 : "Lakh", 1000: "Thousand", 1: ""}


def to_words(system: dict, amount: int) -> str:
    denoms = sorted(system.keys(), reverse = True)
    in_words = ""
    for denom in denoms:
        how_many, amount = divmod(amount, denom)
        if how_many > 0:
            in_words += convert3digits(how_many)+ SPACE + system[denom] + SPACE 
    return in_words
