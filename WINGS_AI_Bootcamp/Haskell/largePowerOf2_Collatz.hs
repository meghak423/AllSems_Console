import Data.Bits ((.&.))

isPowerOf2 :: Int -> Bool
isPowerOf2 n = n > 0 && (n .&. (n - 1)) == 0

nextCollatz :: Int -> Int
nextCollatz n = if odd n then 3 * n + 1 else n `div` 2

collatzPower2 :: Int -> Int
collatzPower2 n
  | n == 1 || n == 2 || n == 4 = 4
  | isPowerOf2 n = n
  | otherwise = collatzPower2 (nextCollatz n)

main :: IO ()
main = do
  let n = 27  -- Replace with any number
  print (collatzPower2 n)

