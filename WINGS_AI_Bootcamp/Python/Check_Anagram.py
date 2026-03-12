#   ANAGRAM  - rearranging the letters of another word or phrase, using all the original letters exactly once.
#               Ex: "listen" and "silent"

import re
from collections import Counter

def clean(s: str) -> str:
    return re.sub(r'[^a-z0-9]', '', s.lower())

def is_anagram_clean(s1: str, s2: str) -> bool:
    return Counter(clean(s1)) == Counter(clean(s2))


# OR

def is_anagram(s1: str, s2: str) -> bool:
    return sorted(s1) == sorted(s2)

print(is_anagram("silet", "listen"))
print(is_anagram_clean("tan", "ant"))