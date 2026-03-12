import Data.Char (toLower, isAlphaNum)
import Data.List (sort)

-- Clean a string: keep only alphanumeric, convert to lowercase
clean :: String -> String
clean = map toLower . filter isAlphaNum

-- Check if two strings are anagrams after cleaning
isAnagramClean :: String -> String -> Bool
isAnagramClean s1 s2 = sort (clean s1) == sort (clean s2)

-- Simple anagram check (no cleaning)
isAnagram :: String -> String -> Bool
isAnagram s1 s2 = sort s1 == sort s2

main :: IO ()
main = do
    print $ isAnagram "silet" "listen"       -- False, because "silet" vs "listen" differ
    print $ isAnagramClean "tan" "ant"       -- True
    print $ isAnagramClean "Listen!" "Silent" -- True
