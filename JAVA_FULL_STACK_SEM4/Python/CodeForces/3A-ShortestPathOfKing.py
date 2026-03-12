col_map = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8}

def shortest_path_of_king(start, target):
    x1, y1 = col_map[start[0]], int(start[1])
    x2, y2 = col_map[target[0]], int(target[1])
    
    moves = []
    
    while x1 != x2 or y1 != y2:
        move = ""
       
        if x1 < x2:
            move += "R"
            x1 += 1
        elif x1 > x2:
            move += "L"
            x1 -= 1
        
        if y1 < y2:
            move += "U"
            y1 += 1
        elif y1 > y2:
            move += "D"
            y1 -= 1
        
        moves.append(move)
    
    print(len(moves))
    for move in moves:
        print(move)

start = input().strip()
target = input().strip()

shortest_path_of_king(start, target)
