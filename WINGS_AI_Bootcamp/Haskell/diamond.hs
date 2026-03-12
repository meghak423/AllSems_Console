import Data.List (intercalate)

line :: Int -> String
line k = intercalate " " (replicate (2 * k + 1) "*")

makeDiamond :: Int -> String
makeDiamond size =
    let mid = size `div` 2
        top = [line i | i <- [0..mid]]
        bottom = [line i | i <- reverse [0..(mid - 1)]]
        allLines = top ++ bottom
        width = maximum (map length allLines)
    in unlines [center width l | l <- allLines]

center :: Int -> String -> String
center w s =
    let pad = replicate ((w - length s) `div` 2) ' '
    in pad ++ s

main :: IO ()
main = putStrLn $ makeDiamond 7
