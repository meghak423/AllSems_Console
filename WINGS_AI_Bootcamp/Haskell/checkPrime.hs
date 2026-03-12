isPrime :: Int -> Bool
isPrime n
  | n `elem` [2, 3, 5] = True
  | n <= 1 || even n    = False
  | otherwise          = checkPrime n 3

checkPrime :: Int -> Int -> Bool
checkPrime n r
  | r * r > n        = True
  | n `mod` r == 0   = False
  | otherwise        = checkPrime n (r + 2)

main :: IO ()
main = do
  let a = 29
  if isPrime a
    then putStrLn (show a ++ " is a prime number")
    else putStrLn (show a ++ " is not a prime number")

