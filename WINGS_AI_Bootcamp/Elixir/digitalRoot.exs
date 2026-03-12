defmodule DigitalRoot do
  def compute(n) when n < 10 do
    n
  end

  def compute(n) do
    digits = Integer.digits(n)
    sum = Enum.sum(digits)
    compute(sum)
  end
end

input = IO.gets("") 
n = String.to_integer(String.trim(input))
IO.puts(DigitalRoot.compute(n))
