def min_moves_to_increasing():
    import sys
    input = sys.stdin.read
    data = input().splitlines()

    # Input
    n, d = map(int, data[0].split())
    b = list(map(int, data[1].split()))

    moves = 0  

    for i in range(1, n):
        if b[i] <= b[i - 1]:
           
            needed = ((b[i - 1] - b[i]) // d) + 1
            moves += needed
            b[i] += needed * d  

    print(moves)


min_moves_to_increasing()
