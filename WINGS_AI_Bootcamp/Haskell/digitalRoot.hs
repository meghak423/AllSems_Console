digitalRoot :: Int -> Int
digitalRoot 0 = 0
digitalRoot n = 1 + (n - 1) `mod` 9

main :: IO ()
main = do
  let n = 45
  print (digitalRoot n)

