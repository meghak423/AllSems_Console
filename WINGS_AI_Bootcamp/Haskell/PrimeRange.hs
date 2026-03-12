factorize :: Int -> [Int]
factorize n = factor n 2
  where
    factor 1 _ = []
    factor m f
      | f * f > m      = [m | m > 1]
      | m `mod` f == 0 = f : factor (m `div` f) f
      | otherwise      = factor m (nextFactor f)
    nextFactor 2 = 3
    nextFactor x = x + 2

main :: IO ()
main = print $ factorize 315  -- Output: [3,3,5,7]

