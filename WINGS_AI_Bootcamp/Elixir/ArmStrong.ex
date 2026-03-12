defmodule Armstrong do
  def is_armstrong(n) do
    digits = Integer.digits(n)
    power = length(digits)
    sum = compute_sum(digits, power)
    sum == n
  end

  defp compute_sum([], _), do: 0
  defp compute_sum([h | t], p), do: :math.pow(h, p) + compute_sum(t, p)
end

IO.inspect(Armstrong.is_armstrong(153))  # true

