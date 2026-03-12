# Asokan's prgm


import random

def count_common_letters(a_word: str, b_word: str) -> int:
    return len(set(a_word) & set(b_word))

def reduce_search_space(words: list[str], word: str, common: int) -> list[str]:
    return [w for w in words if count_common_letters(w, word) == common]

def setup() -> list[str]:
    print("Select Level: ")
    print("\tE for Easy   :: 4 letter words")
    print("\tM for Medium :: 5 letter words")
    print("\tH for Hard   :: 6 letter words")
    level = " "
    while level not in "EMH":
        level = input().upper()
    
    word_file = "sowpods.txt"

    if level == "E":
        word_length = 4
    elif level == "M":
        word_length = 5
    elif level == "H":
        word_length = 6

    return [_.strip().upper() for _ in open(word_file)
            if len(_.strip()) == word_length and len(set(_.strip())) == word_length]


def game():
    possible_words = setup()
    attempt = 1
    while len(possible_words) > 0:
        random.shuffle(possible_words)
        guess = possible_words[0]
        print(f"My guess #{attempt} is {guess}")
        print("\tHow many letters did i get right?")
        print("\tType WIN if the word is the answer")

        response = input().strip().upper()

        if response == "WIN":
            print("yay")
            break
        else:
            common = int(response)
            possible_words = reduce_search_space(possible_words[1:], guess, common)
            attempt += 1
    else:
        print("Your word is not known to me")
        print("Or you want a mistake in the count!")

while True:
    game()
    print("Play again?")
    if input().upper() not in {"Y", "YES", "OK"}:
        break






'''
def setup() -> list[str]:
    print("Select Level: ")
    print("\tE for Easy   :: 4 letter words")
    print("\tM for Medium :: 4 letter words")
    print("\tH for Hard   :: 5 letter words")
    level = " "
    while level not in "EMH":
        level = input().upper()
    if level == "E":
        word_file = "4words.txt"
    elif level == "M":
        word_file = "5words.txt"
    elif level == "H":
        word_file = "6words.txt"
    return [_.strip().upper() for _ in open(word_file) if len(_) == len(set(_))]

'''


### H/W : convert this into object oriented prgm