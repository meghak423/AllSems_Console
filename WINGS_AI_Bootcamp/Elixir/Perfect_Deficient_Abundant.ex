defmodule NumberType do
  def aliquot_sum(n), do: sum_divisors(n, 1, 0)

  defp sum_divisors(n, i, acc) when i >= n, do: acc
  defp sum_divisors(n, i, acc) do
    if rem(n, i) == 0 do
      sum_divisors(n, i + 1, acc + i)
    else
      sum_divisors(n, i + 1, acc)
    end
  end

  def classify(n) do
    sum = aliquot_sum(n)
    cond do
      sum == n -> "Perfect"
      sum < n -> "Deficient"
      sum > n -> "Abundant"
    end
  end
end

IO.puts(NumberType.classify(12))  # Output: Abundant

