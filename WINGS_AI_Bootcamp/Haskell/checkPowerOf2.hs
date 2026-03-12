import Data.Bits ((.&.))

-- Bitwise AND method
isPower2 :: Int -> Bool
isPower2 n = n > 0 && (n .&. (n - 1)) == 0

-- Recursive method
isp2 :: Int -> Bool
isp2 0 = False
isp2 1 = True
isp2 n
  | odd n     = False
  | otherwise = isp2 (n `div` 2)

main :: IO ()
main = do
  print (isPower2 16)  -- True
  print (isPower2 18)  -- False
  print (isp2 16)      -- True
  print (isp2 18)      -- False

