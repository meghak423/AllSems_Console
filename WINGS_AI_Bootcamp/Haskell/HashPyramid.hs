import Data.List (intercalate, replicate)

hash, plus, space :: String
hash = "#"
plus = "+"
space = " "
lf = "\n"
width = 60

line :: Int -> String
line 0 = hash
line k =
    let middle = replicate (2 * k - 1) plus
        full = [hash] ++ middle ++ [hash]
    in intercalate "  " full

hashPyramid :: Int -> String
hashPyramid size =
    let lines = [line k | k <- [0..(size - 1)]]
        centered = [center width l | l <- lines]
    in unlines centered

center :: Int -> String -> String
center w s =
    let padding = replicate ((w - length s) `div` 2) ' '
    in padding ++ s

main :: IO ()
main = putStrLn $ hashPyramid 4

