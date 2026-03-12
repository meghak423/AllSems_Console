def relation(a: str, b: str) -> str:
    if a < b:
        return "<"
    elif a == b:
        return "="
    else:
        return ">"

def squeeze(s: str) -> str:
    if len(s) < 2:
        return s
    if s[0] == s[1]:
        return squeeze(s[1:])
    else:
        return s[0] + squeeze(s[1:])

def classify(text: str) -> str:
    sig = squeeze(''.join(relation(x, y) for x, y in zip(text, text[1:])))
    if sig == "<":
        return "A"   # Ascending
    elif sig == ">":
        return "D"   # Descending
    elif sig == "<>":
        return "P"   # Peak
    elif sig == "><":
        return "V"   # Valley
    else:
        return "X"   # None of the above

# Example Usage:
for s in ["abc", "cba", "abcba", "cbabc", "abdca"]:
    print(s, "->", classify(s))
