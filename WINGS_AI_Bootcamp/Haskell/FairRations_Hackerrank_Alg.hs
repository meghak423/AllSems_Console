fairRations :: [Int] -> Either String Int
fairRations xs = go xs 0
  where
    go [] count = Right count
    go [x] count = if odd x then Left "NO" else Right count
    go (x:y:rest) count
      | odd x = go ((y + 1) : rest) (count + 2)
      | otherwise = go (y : rest) count

main :: IO ()
main = do
  print $ fairRations [2,3,4,5,6] -- Right 4
  print $ fairRations [1,2]       -- Left "NO"

