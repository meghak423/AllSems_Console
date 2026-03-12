import Data.List (zip)

intToRoman :: Int -> String
intToRoman num = go num valuesSymbols
  where
    valuesSymbols = [(1000,"M"),(900,"CM"),(500,"D"),(400,"CD"),
                     (100,"C"),(90,"XC"),(50,"L"),(40,"XL"),
                     (10,"X"),(9,"IX"),(5,"V"),(4,"IV"),(1,"I")]

    go 0 _ = ""
    go n ((val, sym):xs)
      | n >= val  = sym ++ go (n - val) ((val, sym):xs)
      | otherwise = go n xs

main :: IO ()
main = print $ intToRoman 1994  -- Output: "MCMXCIV"

