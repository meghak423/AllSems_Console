import Bitwise


defmodule PowerOf2 do
  # Using bitwise AND (like first Python function)
  def is_power2(n) when n > 0 do
    (n &&& (n - 1)) == 0
  end
  def is_power2(_), do: false

  # Recursive check (like second Python function)
  def isp2(0), do: false
  def isp2(1), do: true
  def isp2(n) when rem(n, 2) == 1, do: false
  def isp2(n), do: isp2(div(n, 2))
end

# Example test runs
IO.inspect PowerOf2.is_power2(16)  # true
IO.inspect PowerOf2.is_power2(18)  # false

IO.inspect PowerOf2.isp2(16)       # true
IO.inspect PowerOf2.isp2(18)       # false

