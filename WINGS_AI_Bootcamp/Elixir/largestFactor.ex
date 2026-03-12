defmodule Factors do
  def largest_factor(n) when rem(n, 2) == 0 do
    div(n, 2)
  end

  def largest_factor(n) do
    find_factor(n, 3)
  end

  defp find_factor(n, r) when r * r > n, do: 1
  defp find_factor(n, r) do
    if rem(n, r) == 0 do
      div(n, r)
    else
      find_factor(n, r + 2)
    end
  end
end

# Example usage:
IO.inspect Factors.largest_factor(12)  # Output: 6
IO.inspect Factors.largest_factor(15)  # Output: 5
IO.inspect Factors.largest_factor(13)  # Output: 1

