def is_ascending(a: int) -> int:
    s = str(a)
    return all(a < b for (a, b) in zip(s, s[1:]))

class Odometer:
    """ Models the Mathematical Odometer:
    Readings cannot have zero; digits of the readings *MUST*Be in strict ascending order
    """
    def __init__(self, size: int):      # initializer(obj) does not return anything   # self means here  o for Odometer
        # initialize size, start and end  readings. set the current reading to start
        self.size = size
        self.START = int("123456789"[:size])
        self.reading = self.START
        self.LIMIT = int("123456789"[-size:])
    def __str__(self) -> str:                   
        return str(self.reading)
    def __repr__(self) -> str:                   # repr - programmer to see
        return f"{self.START} <= { self.reading} <= {self.LIMIT}"
    def next(self, step: int = 1):
        for _ in range(step):
           # while not is_ascending(self.reading):
                if self.reading == self.LIMIT:
                    self.reading = self.START
                else:
                    self.reading += 1
                    while not is_ascending(self.reading):
                        self.reading += 1
    def prev(self, step: int = 1):
        for _ in range(step):
          #  while not is_ascending(self.reading):
                if self.reading == self.LIMIT:
                    self.reading = self.START
                else:
                    self.reading -= 1
                    while not is_ascending(self.reading):
                        self.reading -= 1
    def distance(self, other) -> int:
        if self.size != other.size:
            return -1
        else:
            diff = 0
            selfcopy = Odometer(self.size)
            selfcopy.reading = self.reading
            while selfcopy.reading != other.reading:
                selfcopy.next()
                diff += 1
            return diff
    


a = Odometer(5)
a.next()
print(a)


b = Odometer(5)
b.prev()
print(b)


print(b.distance(a))