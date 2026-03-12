n = int(input())  # Number of rounds
scores = {}
rounds = []

# Process each round
for _ in range(n):
    name, score = input().split()
    score = int(score)
    if name not in scores:
        scores[name] = 0
    scores[name] += score
    rounds.append((name, score))

# Find the maximum score
max_score = max(scores.values())

# Determine the winner based on the rules
current_scores = {name: 0 for name in scores}
for name, score in rounds:
    current_scores[name] += score
    if current_scores[name] >= max_score and scores[name] == max_score:
        print(name)
        break
