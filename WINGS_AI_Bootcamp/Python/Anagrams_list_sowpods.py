from collections import defaultdict

def anagram_list(file_path):
    anagram_dict = defaultdict(list)
    
    with open(file_path, 'r') as file:
        for line in file:
            word = line.strip().lower()
            key = ''.join(sorted(word))
            anagram_dict[key].append(word)

    for group in anagram_dict.values():
        if len(group) > 1:
            print(' '.join(sorted(group)))

anagram_list('sowpods.txt')
