# Asokan's prgm for Word Mastermind OOPs


import random
word_files = {"E": "4words.txt", "M": "5words.txt", "H": "6words.txt"}

class GuessTheWord:
    FIRST_TIME = True
    words = {}
    instructions = """Type WIN if the word displayed is your word else type the number of common letters"""


    def __init__(self):
        if GuessTheWord.FIRST_TIME:
            GuessTheWord.FIRST_TIME = False 
            for level, wf in word_files.items():
                GuessTheWord.words[level] = [w.strip().upper() for w in open(wf) if len(w) == len(set(w))]


        print("Choose level of play")
        print("\tE for Easy   :: 4 letter words")
        print("\tM for Medium :: 5 letter words")
        print("\tH for Hard   :: 6 letter words")


        level = input().upper()
        if level not in "EMH":
            level = "E"
    
        self.possibles = GuessTheWord.words[level][:]

        random.shuffle(self.possibles)
        self.guess = self.possibles[0]
        self.attempts = 0
        self.status = "PLAY"
        self.word_count = len(self.possibles)


        print(f'{len(self.possibles)} remaining out of {self.word_count}')
    
    def __repr__(self) -> str:
        return f"{self.status} :: {self.guess} ({len(self.possibles)} possible)"


    def remove_impossibles(self):
        def common_letter_count(a: str, b:str) -> int:
            return len(set(a) & set(b))
        
        self.possibles = [w for w in self.possibles[1:] if common_letter_count(w, self.guess) == self.response]
        
    def play(self):
        print(self.guess)
        while True:
            response = input().upper()
            if response not in ["WIN"] + list(map(str, range(len(self.guess) + 1))):
                print("Enter WIN or number of common letters")
            elif response == "WIN":
                print("Yay")
                self.status = "WON"
                break
            else:
                self.response = int(response)
                break
      

    def game(self):
        print(GuessTheWord.instructions)
        while self.status == "PLAY":
            self.play()
            if self.status != "PLAY":
                return  # Exit the game loop immediately after winning

            self.remove_impossibles()

            if not self.possibles:
                print("No more possible words left. Maybe you made a mistake.")
                return

            self.guess = self.possibles[0]



game = GuessTheWord()
game.game()



      
'''

    def game(self):
        print(GuessTheWord.instructions)
        while self.status == "PLAY":
            self.play()
            self.remove_impossibles()
            self.guess = self.possibles[0]
        
'''