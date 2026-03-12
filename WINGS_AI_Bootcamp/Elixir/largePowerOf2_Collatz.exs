defmodule Collatz do
  def is_p2(n), do: n > 0 and rem(n, 2) == 0 and (n &&& (n - 1)) == 0

  def next_collatz(n) do
    if rem(n, 2) == 1, do: 3 * n + 1, else: div(n, 2)
  end

  def collatz_power2(n) when n in [1, 2, 4], do: 4
  def collatz_power2(n) do
    if is_p2(n), do: n, else: collatz_power2(next_collatz(n))
  end
end

IO.puts Collatz.collatz_power2(27)  # Replace with any number

