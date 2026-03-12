from collections import defaultdict
from typing import List

def anagram_groups(file_path: str) -> List[List[str]]:
    anagrams = defaultdict(list)
    with open(file_path) as f:
        for line in f:
            #word = line.strip().lower()
            #key = ''.join(sorted(word)) 
            key = ''.join(sorted((word := line.strip().lower())))

            anagrams[key].append(word)
    return [sorted(group) for group in anagrams.values() if len(group) > 1]

groups = anagram_groups('/home/megha/Documents/WINGS_AI/Python/sowpods.txt')
for group in groups:
    print(' '.join(group))

