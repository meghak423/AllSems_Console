sieveOfEratosthenes :: Int -> [Int]
sieveOfEratosthenes n = sieve [2..n]
  where
    sieve [] = []
    sieve (p:xs)
      | p * p > n = p : xs
      | otherwise = p : sieve [x | x <- xs, x `mod` p /= 0]

main :: IO ()
main = print $ sieveOfEratosthenes 30

