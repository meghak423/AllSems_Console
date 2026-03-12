main :: IO ()
main = do
    let picks = [1, 25, 32, 64, 99]
    print picks

    let units = [0,1,2,3,4,5,6,7,8,9]
    let freqs = [10000, 10020, 9980, 10010, 9990, 10005, 10015, 9995, 10025, 9960]
    print freqs

    let avg = fromIntegral (sum freqs) / fromIntegral (sum (replicate 10 10000)) :: Double
    print avg

