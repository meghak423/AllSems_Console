import Bitwise  # Import bitwise operators like &&&

defmodule Figurate do
  def sq(n), do: n == :math.pow(:math.sqrt(n), 2) |> round

  def cube(n) do
    root = :math.pow(n, 1/3) |> round
    root * root * root == n
  end

  def power(n) when n > 0, do: (n &&& (n - 1)) == 0
  def power(_), do: false
end

IO.puts Figurate.sq(4)     # true
IO.puts Figurate.cube(27)  # true
IO.puts Figurate.power(4)  # true

