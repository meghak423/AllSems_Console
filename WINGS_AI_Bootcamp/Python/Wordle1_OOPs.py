import random
import requests

GREEN , AMBER, BLACK = "G", "Y", "R"

register = {"mode": "wordle", "name": "Asokan"}
URL = "https://wordle.we4shakthi.in/game"

class WordleBot:
    FIRST_TIME = True
    word_store = []

    def __init__(self, name: str):
        if WordleBot.FIRST_TIME:
            WordleBot.FIRST_TIME = False
            WordleBot.word_store = [_.strip().upper() for _ in open("5words.txt")]

            self.session = requests.Session()
            register["name"] = name
            response = self.session.post(URL + "/register", register)
            self.game_id = response.json()["id"]

            response = self.session.post(URL + "/create", {"id": self.game_id, "overwrite": True})


        self.words = WordleBot.word_store[:]
        random.shuffle(self.words)
        self.tries = 0
        self.allowed = 6
        self.status = "PLAY"
        self.guess = self.words[0]
        self.feedback = ""
    


    def drop_impossibles(self):
        def no_blacks(blacks: str, word: str) -> bool:
            return all(b not in word for b in blacks)

        def pick_greens(greens: list, word: str) -> bool:
            for pos in range(5):
                if greens[pos] != " " and greens[pos] != word[pos]:
                    return False
            return True

        def pick_ambers(ambers: str, word: str):
            return all(a in word for a in ambers)

        greens = [" "] * 5
        ambers = ""
        blacks = ""

        for pos, letter in enumerate(self.feedback):  # FIXED LINE
            if letter == GREEN:
                greens[pos] = self.guess[pos]
            elif letter == AMBER:
                ambers += self.guess[pos]
            else:
                blacks += self.guess[pos]

        self.words = [_ for _ in self.words if no_blacks(blacks, _)]
        self.words = [_ for _ in self.words if pick_greens(greens, _)]
        self.words = [_ for _ in self.words if pick_ambers(ambers, _)]


def play(self):
    response = self.session.post(URL + '/guess', {"id": self.game_id, "guess": self.guess})
    self.response = response.json()["feedback"]

    if "exceeded" in response.json()["message"]:
        print("Oops")
        self.status = "EXCEEDED"
        print(f"Answer was {response.json()["answer"]}")

    if self.response == WIN: # type: ignore
        print("Yay")
        self.status = "WON"

    self.drop_impossibles()
    self.guess = self.possibles[0]

def game(self):
    while self.status =="PLAY":
        self.play()

    






'''

    def drop_impossibles(self):
        def no_blacks(blacks: str, word: str) -> bool:
            return all(_ not in word for _ in blacks)
        def pick_greens(greens: str, word: str) -> bool:
            for pos, letter in enumerate(word):
                if greens[pos] != " " and greens[pos] != word[pos]:
                    return False
            return True
        def pick_ambers(ambers: str, word: str):
            return all(_ in word for _ in ambers)
        
        greens = [" ", " ", " ", " ", " "]
        ambers = ""
        blacks = ""
        for pos,letter in self.response:
            if letter == "G":
                greens[pos] = self.guess[pos]
            elif letter == "A":
                ambers += letter
            else:
                blacks += letter
        self.words = [_ for _ in self.words if no_blacks(blacks, _)]
        self.words = [_ for _ in self.words if pick_greens(greens, _)]
        self.words = [_ for _ in self.words if pick_ambers(ambers, _)]

        





bot = WordleBot()

print("Initial guess:", bot.guess)

bot.feedback = "GABBG"

bot.drop_impossibles()

print("\nTop 10 remaining possible guesses:")
print(bot.words[:10])

print(f"\nTotal words remaining: {len(bot.words)}")




'''
