defmodule FairRations do
  def oe(n) do
    if rem(n, 2) == 0 do
      'E'
    else
      '0'
    end
  end

  def distribute(loaves) do
    if rem(Enum.sum(loaves), 2) == 1 do
      "NO"
    else
      distribute_recursive(Enum.map(loaves, &oe/1))
    end
  end

  defp distribute_recursive([]), do: 0
  defp distribute_recursive(['E' | xs]), do: distribute_recursive(xs)
  defp distribute_recursive(['0', '0' | xs]), do: 2 + distribute_recursive(xs)
  defp distribute_recursive(['0', 'E' | xs]), do: 2 + distribute_recursive(['0' | xs])

  def main do
    IO.inspect(distribute([1, 2, 1]))
    IO.inspect(distribute([1, 2, 2, 1]))
  end
end

FairRations.main()
