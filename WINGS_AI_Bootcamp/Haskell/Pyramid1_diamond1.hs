import Data.List (intercalate)

width :: Int
width = 60

start :: Int -> String
start _ = "*"

repeatStar :: Int -> String
repeatStar k = concat $ replicate k "**"

stop :: Int -> String
stop _ = ""

line :: Int -> String
line k = start k ++ repeatStar k ++ stop k

pattern :: Int -> [String]
pattern size = map line [0..size-1]

center :: Int -> String -> String
center w s = replicate padding ' ' ++ s
  where padding = (w - length s) `div` 2

makePyramid :: Int -> String
makePyramid size = intercalate "\n" $ map (center width) (pattern size)

makeDiamond :: Int -> String
makeDiamond size =
  let half = if even size then size `div` 2 else (size + 1) `div` 2
      top = pattern half
      bottom = reverse (pattern (size - half))
  in intercalate "\n" $ map (center width) (top ++ bottom)

main :: IO ()
main = do
  putStrLn $ makePyramid 7
  putStrLn $ makeDiamond 8

