import Data.List (sortBy)
import Data.Char (isDigit)

getPower :: String -> Int
getPower term
  | '^' `elem` term = read (drop 1 (dropWhile (/= '^') term)) :: Int
  | 'x' `elem` term = 1
  | otherwise = 0

main :: IO ()
main = do
  let expr = "3x^2 + 5x^4 - 2x + 7"
      exprSpaced = concatMap (\c -> if c == '+' || c == '-' then " " ++ [c] else [c]) expr
      terms = words exprSpaced
      sorted = sortBy (\a b -> compare (getPower b) (getPower a)) terms
  putStrLn $ unwords sorted

