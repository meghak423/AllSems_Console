import Data.List (sort)
import Control.Monad (when)

digits :: Int -> [Int]
digits 0 = []
digits x = digits (x `div` 10) ++ [x `mod` 10]

fromDigits :: [Int] -> Int
fromDigits = foldl (\acc d -> acc * 10 + d) 0

nextNumber :: Int -> Int
nextNumber n =
  let ds = digits n
      largest = fromDigits $ reverse (sort ds)
      smallest = fromDigits $ sort ds
  in largest - smallest

generate :: Int -> IO ()
generate n = do
  print n
  let next = nextNumber n
  when (next /= n) (generate next)

main :: IO ()
main = generate 1729

