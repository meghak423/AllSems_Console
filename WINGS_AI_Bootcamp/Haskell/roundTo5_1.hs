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

main :: IO ()
main = do
  print (roundTo5 42.73)
  print (roundTo5 (fromIntegral (nearest 42.73 5)))
  print (roundTo5 (fromIntegral (nearest 42.73 10)))

