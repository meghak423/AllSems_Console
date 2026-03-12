aliquotSum :: Int -> Int
aliquotSum n = sum [x | x <- [1..n-1], n `mod` x == 0]

main :: IO ()
main = print (aliquotSum 12)  -- Output: 16

