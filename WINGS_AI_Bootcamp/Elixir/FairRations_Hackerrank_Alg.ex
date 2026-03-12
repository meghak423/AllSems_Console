defmodule FairRations do
  require Integer

  def fair_rations(breads), do: helper(breads, 0)

  defp helper([], count), do: count

  defp helper([x], _count) when Integer.is_odd(x), do: "NO"
  defp helper([x], count) when Integer.is_even(x), do: count

  defp helper([x, y | rest], count) do
    if Integer.is_odd(x) do
      helper([y + 1 | rest], count + 2)
    else
      helper([y | rest], count)
    end
  end
end

# Usage examples:
IO.inspect FairRations.fair_rations([2, 3, 4, 5, 6])  # Outputs: 4
IO.inspect FairRations.fair_rations([1, 2])           # Outputs: "NO"

