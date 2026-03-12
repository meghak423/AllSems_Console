import Data.List (sort, groupBy, sortOn)
import Data.Char (toLower)
import System.IO

-- Generate the key by sorting lowercase letters of the word
key :: String -> String
key = sort . map toLower

anagramList :: FilePath -> IO ()
anagramList filePath = do
    contents <- readFile filePath
    let wordsList = lines contents
        -- Pair each word with its key
        paired = [(key w, w) | w <- wordsList]
        -- Sort by key to group anagrams together
        sortedPairs = sortOn fst paired
        -- Group by key
        grouped = groupBy (\a b -> fst a == fst b) sortedPairs
        -- Filter groups with more than one word
        filtered = filter (\g -> length g > 1) grouped
        -- Extract only words and sort each group
        anagramGroups = map (sort . map snd) filtered
    -- Print each group on its own line
    mapM_ (putStrLn . unwords) anagramGroups

main :: IO ()
main = anagramList "sowpods.txt"

