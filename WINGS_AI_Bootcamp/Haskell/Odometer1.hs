import Data.Char (digitToInt)

data Odometer = Odometer
  { size :: Int
  , start :: Int
  , limit :: Int
  , reading :: Int
  } deriving Show

-- Check if digits are strictly ascending (no zeros)
isAscending :: Int -> Bool
isAscending n = all (\(a,b) -> a < b) $ zip digits (tail digits)
  where digits = map digitToInt (show n)

-- Create new odometer given size
newOdometer :: Int -> Odometer
newOdometer sz =
  let startStr = take sz "123456789"
      limitStr = drop (9 - sz) "123456789"
      st = read startStr :: Int
      lm = read limitStr :: Int
  in Odometer sz st lm st

-- Get next reading in odometer sequence
nextReading :: Odometer -> Int -> Int
nextReading od n
  | n == limit od = start od
  | otherwise = head $ filter isAscending [n+1 .. limit od]

-- Get previous reading in odometer sequence
prevReading :: Odometer -> Int -> Int
prevReading od n
  | n == start od = limit od
  | otherwise = head $ filter isAscending (reverse [start od .. n-1])

-- Advance odometer by steps
next :: Odometer -> Int -> Odometer
next od 0 = od
next od steps = next (od { reading = nextReading od (reading od) }) (steps - 1)

-- Move odometer backwards by steps
prev :: Odometer -> Int -> Odometer
prev od 0 = od
prev od steps = prev (od { reading = prevReading od (reading od) }) (steps - 1)

-- Compute distance between two odometers (number of steps forward to get from first to second)
distance :: Odometer -> Odometer -> Int
distance od1 od2
  | size od1 /= size od2 = -1
  | otherwise = distanceHelper od1 od2 0

distanceHelper :: Odometer -> Odometer -> Int -> Int
distanceHelper od1 od2 count
  | reading od1 == reading od2 = count
  | otherwise = distanceHelper od1' od2 (count + 1)
    where od1' = next od1 1

-- Display odometer reading as string
showReading :: Odometer -> String
showReading = show . reading

main :: IO ()
main = do
  let a = next (newOdometer 5) 1
  putStrLn $ "Next: " ++ showReading a

  let b = prev (newOdometer 5) 1
  putStrLn $ "Prev: " ++ showReading b

  putStrLn $ "Distance: " ++ show (distance b a)
