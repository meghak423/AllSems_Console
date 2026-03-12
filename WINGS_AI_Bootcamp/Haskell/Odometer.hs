import Data.Char (digitToInt)

isValid :: Int -> Bool
isValid n
  | n < 10 = True
  | otherwise =
      let digits = map digitToInt (show n)
          pairs = zip digits (tail digits)
       in all (\(a,b) -> a < b) pairs

getLimits :: Int -> (Int, Int)
getLimits n =
  let limit = "123456789"
      size = length (show n)
      start = read (take size limit) :: Int
      end = read (drop (length limit - size) limit) :: Int
   in (start, end)

nextReading :: Int -> Int
nextReading reading =
  let (start, limit) = getLimits reading
      next n
        | n > limit = start
        | isValid n = n
        | otherwise = next (n + 1)
   in if reading == limit then start else next (reading + 1)

nextReadingK :: Int -> Int -> Int
nextReadingK reading 0 = reading
nextReadingK reading k = nextReadingK (nextReading reading) (k - 1)

prevReading :: Int -> Int
prevReading reading =
  let (start, limit) = getLimits reading
      prev n
        | n < start = limit
        | isValid n = n
        | otherwise = prev (n - 1)
   in if reading == start then limit else prev (reading - 1)

prevReadingK :: Int -> Int -> Int
prevReadingK reading 0 = reading
prevReadingK reading k = prevReadingK (prevReading reading) (k - 1)

distance :: Int -> Int -> Int
distance a b
  | length (show a) /= length (show b) = -1
  | otherwise = go a 0
  where
    (_, limit) = getLimits a
    go curr count
      | count > 10^(length (show a)) = -1
      | curr == b = count
      | otherwise = go (nextReading curr) (count + 1)

-- Examples
main :: IO ()
main = do
  print $ nextReading 2468
  print $ nextReadingK 2468 3
  print $ prevReading 2468
  print $ prevReadingK 2468 3
  print $ distance 2468 2469

