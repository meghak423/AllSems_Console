def pyramid(lines: int) -> None:
    for i in range(1, lines + 1):
        for j in range(lines - i):
            print(" ", end = "")
        for j in range(2 * i - 1):
            #if j != 0:
             #   print(" ", end = "")
            print("*", end = "")
        print()

lines = int(input())
pyramid(lines)