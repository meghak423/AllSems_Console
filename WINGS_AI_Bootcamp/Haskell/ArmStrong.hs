isArmstrong :: Int -> Bool
isArmstrong n = n == sum (map (^ len) digits)
  where
    digits = map (read . (:[])) (show n)
    len = length digits

main :: IO ()
main = print (isArmstrong 153)  -- True

