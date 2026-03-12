import Data.List (sort, groupBy, sortBy)
import Data.Char (toLower)
import System.IO

-- Sort letters of a word to form the key
key :: String -> String
key = sort . map toLower

-- Read words from file, group anagrams, filter and print
main :: IO ()
main = do
    contents <- readFile "sowpods.txt"
    let wordsList = lines contents
        -- Group words by their sorted lowercase letters
        grouped = groupBy (\a b -> key a == key b) $ sortBy (\a b -> compare (key a) (key b)) wordsList
        -- Filter groups with more than one word (anagrams)
        filtered = filter (\g -> length g > 1) grouped
        -- Sort each group alphabetically
        sortedGroups = map sort filtered
        -- Sort groups by their first word
        finalOutput = sortBy compare sortedGroups
    -- Print each group on its own line
    mapM_ (putStrLn . unwords) finalOutput

