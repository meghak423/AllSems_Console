def is_valid(n: int) -> bool:
    if n < 10:
        return True
    elif (n // 10) % 10 < n % 10:
        return is_valid(n // 10)
    else:
        return False

def get_limits(n: int) -> tuple[int, int]:
    LIMIT = "123456789"
    size = len(str(n))
    return int(LIMIT[:size]), int(LIMIT[-size:])

def next_reading(reading: int) -> int:
    start, limit = get_limits(reading)
    if reading == limit:
        return start
    reading += 1
    while not is_valid(reading):
        reading += 1
        if reading > limit:
            reading = start
    return reading

def next_reading_k(reading: int, step: int = 1) -> int:
    for _ in range(step):
        reading = next_reading(reading)
    return reading

def prev_reading(reading: int) -> int:
    start, limit = get_limits(reading)
    if reading == start:
        return limit
    reading -= 1
    while not is_valid(reading):
        reading -= 1
        if reading < start:
            reading = limit
    return reading

def prev_reading_k(reading: int, step: int = 1) -> int:
    for _ in range(step):
        reading = prev_reading(reading)
    return reading

def distance(a_reading: int, b_reading: int) -> int:
    if len(str(a_reading)) != len(str(b_reading)):
        return -1
    diff = 0
    current = a_reading
    while current != b_reading:
        current = next_reading(current)
        diff += 1
        if diff > 10**len(str(a_reading)):  # avoid infinite loop
            return -1
    return diff

# Examples
print(next_reading(2468))        # next reading after 2468
print(next_reading_k(2468, 3))   # 3 readings after 2468
print(prev_reading(2468))        # previous reading before 2468
print(prev_reading_k(2468, 3))   # 3 readings before 2468
print(distance(2468, 2469))      # distance between readings
