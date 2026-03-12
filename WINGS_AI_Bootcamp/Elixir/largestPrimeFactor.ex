defmodule Factors do
  def largest_prime_factor(n), do: lpf(n, 2, -1)

  defp lpf(n, _f, largest) when n < 2, do: largest

  defp lpf(n, f, _largest) when rem(n, f) == 0 do
    lpf(div(n, f), f, f)
  end

  defp lpf(n, f, largest) when f * f > n do
    if n > 1, do: n, else: largest
  end

  defp lpf(n, f, largest) do
    lpf(n, next_factor(f), largest)
  end

  defp next_factor(2), do: 3
  defp next_factor(x), do: x + 2
end

IO.inspect Factors.largest_prime_factor(315)  # Output: 7

