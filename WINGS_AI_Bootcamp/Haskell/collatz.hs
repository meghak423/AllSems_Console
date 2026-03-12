next :: Int -> Int
next n = if even n then div n 2 else 3 * n + 1
collatz :: Int -> [Int]
collatz n = takeWhile (/= 4) (iterate next n) ++ [4, 2, 1]

main = do
	print $ collatz 7
