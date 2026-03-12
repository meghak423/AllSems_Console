import Data.Char (toUpper)
import Data.List (isPrefixOf)
import Data.Maybe (fromJust)

isLeap :: Int -> Bool
isLeap year = (year `mod` 4 == 0 && year `mod` 100 /= 0) || (year `mod` 400 == 0)

daysUpto :: [(String, Int)]
daysUpto = [ ("JAN", 0), ("FEB", 31), ("MAR", 59), ("APR", 90), ("MAY", 120), ("JUN", 151)
           , ("JUL", 181), ("AUG", 212), ("SEP", 243), ("OCT", 273), ("NOV", 304), ("DEC", 334)]

-- Converts month string to uppercase first 3 letters
normalizeMon :: String -> String
normalizeMon = map toUpper . take 3

toJulian :: String -> Int
toJulian s =
    let parts = words $ map (\c -> if c == ',' then ' ' else c) s
        dd = read (head parts) :: Int
        mon = normalizeMon (parts !! 1)
        yyyy = read (parts !! 2) :: Int
        dayBase = fromJust (lookup mon daysUpto) + dd
        dayOfYear = if isLeap yyyy && mon > "FEB" then dayBase + 1 else dayBase
    in yyyy * 1000 + dayOfYear

main :: IO ()
main = do
    print $ toJulian "4 Mar 2025"    -- 2025063
    print $ toJulian "29 Feb 2024"   -- 2024060
    print $ toJulian "1 Jan 2000"    -- 2000001

