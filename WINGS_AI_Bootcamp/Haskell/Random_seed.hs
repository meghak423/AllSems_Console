-- Generates a "random-looking" sequence using a simple formula
pseudoRandoms :: Int -> Int -> [Int]
pseudoRandoms seed size = take size $ iterate (\x -> (x * 73 + 41) `mod` 100) seed

-- Frequency counter for digits 0-9
digitFreqs :: [Int] -> [Int]
digitFreqs xs = [length (filter (== d) xs) | d <- [0..9]]

main :: IO ()
main = do
    let picks = pseudoRandoms 42 30
    print picks

    let units = pseudoRandoms 12345 (10^5)
    print $ digitFreqs (map (`mod` 10) units)

    let units2 = pseudoRandoms 54321 (10^7)
    let digits2 = map (`mod` 10) units2
    let freqs = digitFreqs digits2
    print freqs

    let avg = fromIntegral (sum digits2) / 1e7 :: Double
    putStrLn ("Average: " ++ show avg)

