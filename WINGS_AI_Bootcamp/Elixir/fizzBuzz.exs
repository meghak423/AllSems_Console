defmodule FizzBuzz do
  def fb_1(k) when rem(k, 15) == 0 do
    "FIZZBUZZ"
  end

  def fb_1(k) when rem(k, 3) == 0 do
    "FIZZ"
  end

  def fb_1(k) when rem(k, 5) == 0 do
    "BUZZ"
  end

  def fb_1(k) do 
    Integer.to_string(k)
  end
end

res = FizzBuzz.fb_1(15) 
IO.puts(res) 