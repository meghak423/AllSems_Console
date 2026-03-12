aliquotSum :: Int -> Int
aliquotSum n = sum [x | x <- [1..n-1], n `mod` x == 0]

classify :: Int -> String
classify n
  | s == n = "Perfect"
  | s < n  = "Deficient"
  | s > n  = "Abundant"
  where s = aliquotSum n

main :: IO ()
main = print (classify 12)  -- Output: "Abundant"

