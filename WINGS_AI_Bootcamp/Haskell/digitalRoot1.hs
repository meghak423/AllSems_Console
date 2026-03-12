digitalRoot :: Int -> Int
digitalRoot n
  | n < 10 = n
  | otherwise = digitalRoot (sumDigits n)

sumDigits :: Int -> Int
sumDigits 0 = 0
sumDigits x = (x `mod` 10) + sumDigits (x `div` 10)

main :: IO ()
main = do
  let n = 45  -- Change this value for testing
  print (digitalRoot n)

