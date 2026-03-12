def has_unique_letters(word):
    return len(set(word)) == len(word)

with open("sowpods.txt") as f:
    words = [w.strip().upper() for w in f if has_unique_letters(w.strip())]

with open("4words.txt", "w") as f4, open("5words.txt", "w") as f5, open("6words.txt", "w") as f6:
    for word in words:
        if len(word) == 4:
            f4.write(word + "\n")
        elif len(word) == 5:
            f5.write(word + "\n")
        elif len(word) == 6:
            f6.write(word + "\n")
