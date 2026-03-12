largestFactor :: Int -> Int
largestFactor n
  | even n    = n `div` 2
  | otherwise = findFactor n 3

findFactor :: Int -> Int -> Int
findFactor n r
  | r * r > n      = 1
  | n `mod` r == 0 = n `div` r
  | otherwise     = findFactor n (r + 2)

main :: IO ()
main = do
  print $ largestFactor 12  -- 6
  print $ largestFactor 15  -- 5
  print $ largestFactor 13  -- 1

