import Data.List (intercalate)

space, andWord, hundred :: String
space = " "
andWord = "and"
hundred = "hundred"

upto20 :: [String]
upto20 = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
          "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
          "Sixteen", "Seventeen", "Eighteen", "Nineteen"]

tens :: [String]
tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]

convert2 :: Int -> String
convert2 k
  | k < 20 = upto20 !! k
  | otherwise = tens !! (k `div` 10) ++ (if k `mod` 10 /= 0 then space ++ upto20 !! (k `mod` 10) else "")

convert3 :: Int -> String
convert3 k
  | k < 100 = convert2 k
  | r == 0 = convert2 h ++ space ++ hundred
  | otherwise = convert2 h ++ space ++ hundred ++ space ++ andWord ++ space ++ convert2 r
  where (h, r) = k `divMod` 100

type System = [(Int, String)]

western, indian :: System
western = [(10^12, "Trillion"), (10^9, "Billion"), (10^6, "Million"), (1000, "Thousand"), (1, "")]
indian = [(10^9, "Arab"), (10^7, "Crore"), (10^5, "Lakh"), (1000, "Thousand"), (1, "")]

toWords :: System -> Int -> String
toWords system amount = intercalate space . filter (/= "") $ go system amount
  where
    go [] _ = []
    go ((denom, label):rest) amt =
      let (q, r) = amt `divMod` denom
      in (if q > 0 then convert3 q ++ (if label /= "" then space ++ label else "") else "") : go rest r

main :: IO ()
main = do
  putStrLn $ toWords western 671
  putStrLn $ toWords indian 123456789
