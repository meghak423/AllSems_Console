import Data.List (intercalate)

pascalsTriangle :: Int -> [[Int]]
pascalsTriangle n = take n $ iterate nextRow [1]
  where
    nextRow row = zipWith (+) ([0] ++ row) (row ++ [0])

printPascalsTriangle :: Int -> IO ()
printPascalsTriangle n = do
  let triangle = pascalsTriangle n
      lastRowStr = intercalate "   " $ map show (last triangle)
      maxWidth = length lastRowStr
  mapM_ (printRow maxWidth) triangle

printRow :: Int -> [Int] -> IO ()
printRow maxWidth row = do
  let rowStr = intercalate "   " $ map show row
      padding = replicate ((maxWidth - length rowStr) `div` 2) ' '
  putStrLn $ padding ++ rowStr

main :: IO ()
main = printPascalsTriangle 6

