largestPrimeFactor :: Integer -> Integer
largestPrimeFactor n = lpf n 2 (-1)
  where
    lpf n f largest
      | n < 2            = largest
      | n `mod` f == 0   = lpf (n `div` f) f f
      | f * f > n        = if n > 1 then n else largest
      | otherwise        = lpf n (nextFactor f) largest

    nextFactor 2 = 3
    nextFactor x = x + 2

main :: IO ()
main = print $ largestPrimeFactor 315  -- Output: 7

