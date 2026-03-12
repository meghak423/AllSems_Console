# With sowpods.txt


import random

def load_words(filepath: str) -> list:
    with open(filepath, 'r') as f:
        return [line.strip().lower() for line in f if line.strip()]

def count_matches(secret: str, guess: str) -> int:
    return len(set(secret) & set(guess))

def play_game(words: list):
    secret = random.choice(words)
    length = len(secret)

    while True:
        guess = input().strip().lower()

        if len(guess) != length or guess not in words:
            continue  
        print(guess)

        if guess == secret:
            print("correct")
            break

        print(count_matches(secret, guess))

words = [w for w in load_words("sowpods.txt") if len(w) == 4]

play_game(words)



'''

# Without sowpods.txt



def count_matches(secret: str, guess: str) -> int:
    return len(set(secret.lower()) & set(guess.lower()))

def play_game():
    secret = input().strip().lower()  # waiting for secret word
    while True:
        guess = input().strip().lower()  # waiting for guess
        if guess == secret:
            print("correct")
            break
        print(count_matches(secret, guess))

play_game()


'''