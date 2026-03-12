from itertools import combinations as nCr

class Odometer:
    FIRST_TIME = True
    DIGITS = "123456789"
    ALL_READINGS = dict()

    def __init__(self, size):
        if Odometer.FIRST_TIME:
            Odometer.FIRST_TIME = False
            for k in range(2, 9):
                Odometer.ALL_READINGS[k] = [''.join(_) for _ in nCr(Odometer.DIGITS, k)]
        self.size = size
        self.readings = Odometer.ALL_READINGS[size]
        self.pos = 0
        self.count = len(self.readings)

    def __repr__(self) -> str:
        return f"{self.readings[self.pos]} @ {self.pos} of {self.count}"

    def __str__(self) -> str:
        return self.readings[self.pos]

    def forward(self, steps:int = 1):
        self.pos = (self.pos + steps) % self.count

    def backward(self, steps:int = 1):
        self.pos = (self.pos - steps) % self.count

    def distance(self, other) -> int:
        if self.size != other.size:
            return -1
        elif self.pos <= other.pos:
            return other.pos - self.pos
        else:
            return self.count - (self.pos - other.pos)
        


odo1 = Odometer(3)
print("Initial odo1:", odo1)          

odo1.forward()
print("After forward(1):", odo1)     
odo1.forward(4)
print("After forward(4):", odo1)    

odo1.backward(2)
print("After backward(2):", odo1)   



odo2 = Odometer(3)
odo2.forward(5)
print("odo2 after forward(5):", odo2)

print("Distance from odo1 to odo2:", odo1.distance(odo2))


odo3 = Odometer(4)
print("Distance from odo1 to odo3 (diff size):", odo1.distance(odo3))
