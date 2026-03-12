-- Asokan's Pyramid in Haskell with spacing and centered formatting

star :: String
star = "*"

-- Generate one line of the pyramid with k stars and spaces
line :: Int -> String
line k = unwords (replicate (2 * k + 1) star)

-- Generate all pyramid lines
pyramid :: Int -> [String]
pyramid size = [line i | i <- [0..size - 1]]

-- Center each line within fixed width
format :: [String] -> [String]
format lines = map (\l -> center 40 l) lines

-- Centering function
center :: Int -> String -> String
center width str =
  let len = length str
      pad = max 0 ((width - len) `div` 2)
  in replicate pad ' ' ++ str

-- Main function without user input (static value for online compilers)
main :: IO ()
main = do
  let size = 7  -- number of pyramid lines
  let output = format (pyramid size)
  putStrLn (unlines output)

