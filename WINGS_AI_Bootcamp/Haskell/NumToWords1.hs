import qualified Data.Map as M
import Data.List (sort, reverse)

oneWords :: [String]
oneWords = ["", "One", "Two","Three", "Four", "Five","Six", "Seven", "Eight","Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"]

tenWords :: [String]
tenWords = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]

wSystem :: M.Map Int String
wSystem = M.fromList [(10^12, "Trillion"), 
                      (10^9, "Billion"), 
                      (10^6, "Million"), 
                      (1000, "Thousand"), 
                      (1, "")]

iSystem :: M.Map Int String  -- Fixed typo here
iSystem = M.fromList [(10^9, "Arab"), 
                      (10^7, "Crore"), 
                      (10^5, "Lakh"), 
                      (1000, "Thousand"), 
                      (1, "")]

breakInto' :: Int -> [Int] -> [(Int, Int)]
breakInto' _ []  = []
breakInto' amt [1] = [(amt, 1)]
breakInto' amt (d: ds) = (div amt d, d) : breakInto' (rem amt d) ds  -- call breakInto' recursively

breakInto :: Int -> [Int] -> [(Int, Int)]
breakInto amt ds = filter (\a -> fst a /= 0) $ breakInto' amt ds

convert :: Int -> String 
convert amt 
    | amt < 20 = oneWords !! amt
    | amt < 100 = tenWords !! (div amt 10) ++ " " ++ oneWords !! (rem amt 10)
    | rem amt 100 == 0 = oneWords !! (div amt 100) ++ " hundred"
    | otherwise = oneWords !! (div amt 100) ++ " Hundred and " ++ convert (rem amt 100)

main = do
    print $ M.keys iSystem
    print $ breakInto' 167234520 $ reverse $ sort $ M.keys wSystem
    print $ breakInto' 167234520 $ reverse $ sort $ M.keys iSystem
    print $ breakInto 167234520 $ reverse $ sort $ M.keys wSystem
    print $ breakInto 167234520 $ reverse $ sort $ M.keys iSystem

    print $ convert 15
    print $ convert 30
    print $ convert 671

    print $ map (\x -> (convert (fst x), snd x)) $ breakInto 167234520 $ reverse $ sort $ M.keys wSystem
    print $ map (\x -> (convert (fst x), snd x)) $ breakInto 167234520 $ reverse $ sort $ M.keys iSystem