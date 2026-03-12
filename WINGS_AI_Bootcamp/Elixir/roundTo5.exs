defmodule Rounding do
  def round_to_5(amt) do
    change = rem(round(amt * 100), 500) / 100.0
    fives = div(round(amt * 100), 500)
    if change >= 2.5, do: 5 * (fives + 1), else: 5 * fives
  end

  def nearest(amt, denom) do
    threshold = denom / 2
    how_many = floor(amt / denom)
    remainder = rem(round(amt * 100), denom * 100) / 100.0
    if remainder < threshold, do: how_many * denom, else: (how_many + 1) * denom
  end
end

# Hardcoded test values
amt1 = 42.73
amt2 = 42.73
amt3 = 42.73

IO.puts(Rounding.round_to_5(amt1))
IO.puts(Rounding.round_to_5(Rounding.nearest(amt2, 5)))
IO.puts(Rounding.round_to_5(Rounding.nearest(amt3, 10)))

