import Data.List (group)

relation :: Char -> Char -> Char
relation a b
  | a < b = '<'
  | a == b = '='
  | otherwise = '>'

squeeze :: String -> String
squeeze [] = []
squeeze [x] = [x]
squeeze (x:y:xs)
  | x == y = squeeze (y:xs)
  | otherwise = x : squeeze (y:xs)

classify :: String -> String
classify text =
  let sig = squeeze (zipWith relation text (tail text))
  in case sig of
       "<"  -> "A"
       ">"  -> "D"
       "<>" -> "P"
       "><" -> "V"
       _    -> "X"

main :: IO ()
main = do
  print $ classify "abc"    -- A
  print $ classify "cba"    -- D
  print $ classify "abcba"  -- P
  print $ classify "cbabc"  -- V
  print $ classify "abdca"  -- X

