import Data.Bits ( (.&.) )

isSquare :: Int -> Bool
isSquare n = (truncate . sqrt $ fromIntegral n) ^ 2 == n

isCube :: Int -> Bool
isCube n = let c = round (fromIntegral n ** (1/3)) in c^3 == n

isPowerOfTwo :: Int -> Bool
isPowerOfTwo n = n > 0 && (n .&. (n - 1)) == 0

main :: IO ()
main = do
  print (isSquare 4)       -- True
  print (isCube 27)        -- True
  print (isPowerOfTwo 4)   -- True

