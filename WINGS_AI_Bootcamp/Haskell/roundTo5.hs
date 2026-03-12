import Data.Fixed (mod')

roundTo5 :: Double -> Int
roundTo5 amt =
  let change = amt `mod'` 5
      fives = amt / 5
      threshold = 2.5
  in if change >= threshold
     then 5 * (floor fives + 1)
     else 5 * floor fives

nearest :: Double -> Int -> Int
nearest amt denom =
  let threshold = fromIntegral denom / 2
      howMany = floor (amt / fromIntegral denom)
  in if amt `mod'` fromIntegral denom < threshold
     then howMany * denom
     else (howMany + 1) * denom

nearestTo :: Double -> Int -> Int
nearestTo amt denom = round (amt / fromIntegral denom) * denom

main :: IO ()
main = do
  let amt1 = 42.73
  print (roundTo5 amt1)

  let amt2 = 42.73
      denom1 = 5
  print (roundTo5 (fromIntegral (nearest amt2 denom1)))

  let amt3 = 42.73
      denom2 = 10
  print (roundTo5 (fromIntegral (nearest amt3 denom2)))

