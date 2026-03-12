import Data.Map (Map, fromList, (!))
import Data.Char (toUpper)

romanMap :: Map Char Int
romanMap = fromList [('I',1), ('V',5), ('X',10), ('L',50), ('C',100), ('D',500), ('M',1000)]

romanToInt :: String -> Int
romanToInt s = go (reverse $ map toUpper s) 0 0
  where
    go [] _ total = total
    go (c:cs) prev total =
      let val = romanMap ! c
      in if val < prev
         then go cs val (total - val)
         else go cs val (total + val)

main :: IO ()
main = do
  print $ romanToInt "MCMXCIV"  -- Should print 1994

