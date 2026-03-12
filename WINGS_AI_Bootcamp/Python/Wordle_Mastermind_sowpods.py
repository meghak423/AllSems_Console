# It give word  i give no.of letters matched


from collections import Counter

def load_words(filepath: str, length: int) -> list:
    with open(filepath, "r") as f:
        return [w.strip().lower() for w in f if len(w.strip()) == length]

def count_matches(word1: str, word2: str) -> int:
    c1 = Counter(word1)
    c2 = Counter(word2)
    return sum(min(c1[ch], c2[ch]) for ch in c1 if ch in c2)

secret = input("Enter your secret word: ").strip().lower()
length = len(secret)

words = load_words("sowpods.txt", length)
used = set()

while True:
    guess = None
    for w in words:
        if w not in used:
            guess = w
            used.add(w)
            break

    if not guess:
        print("❌ No more possible guesses. Check your previous feedback.")
        break

    print(guess)
    feedback = input().strip().lower()

    if feedback in {"win", "correct"}:
        print("✅ The word is:", guess)
        break

    try:
        match_count = int(feedback)
    except ValueError:
        print("⚠️ Enter a number or 'WIN'")
        continue

    words = [
        w for w in words
        if w not in used and count_matches(w, guess) == match_count
    ]

    if not words:
        print("❌ No matching words left. The word might be:", secret)
        break




# I give number it gives matching word


'''

from collections import Counter

def load_words(filepath: str, length: int) -> list:
    with open(filepath, 'r') as f:
        return [w.strip().lower() for w in f if len(w.strip()) == length]

def count_matches(word1: str, word2: str) -> int:
    c1 = Counter(word1)
    c2 = Counter(word2)
    return sum(min(c1[ch], c2[ch]) for ch in c1 if ch in c2)

def generate_word_by_match(secret: str, match_count: int, wordlist: list):
    matches = [word for word in wordlist if word != secret and count_matches(secret, word) == match_count]

    if matches:
        return matches[0]
    elif count_matches(secret, secret) == match_count:
        print("Correct")
        print(secret)
        exit()  
    else:
        return "No match found"

secret = input().strip().lower()

words = load_words("sowpods.txt", len(secret))

while True:
    try:
        n = input().strip()
        if not n:
            break
        match_count = int(n)
        print(generate_word_by_match(secret, match_count, words))
    except ValueError:
        continue


'''