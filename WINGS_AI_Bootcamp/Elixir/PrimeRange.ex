defmodule Factors do
  def factorize(n) when n < 2, do: []

  def factorize(n) do
    {n_after_twos, twos} = extract_twos(n, [])
    factorize_odd(n_after_twos, 3, twos)
  end

  defp extract_twos(n, acc) do
    if rem(n, 2) == 0 do
      extract_twos(div(n, 2), [2 | acc])
    else
      {n, acc}
    end
  end

  defp factorize_odd(n, f, acc) when f * f > n do
    if n > 1 do
      Enum.reverse([n | acc])
    else
      Enum.reverse(acc)
    end
  end

  defp factorize_odd(n, f, acc) do
    if rem(n, f) == 0 do
      factorize_odd(div(n, f), f, [f | acc])
    else
      factorize_odd(n, f + 2, acc)
    end
  end
end

IO.inspect(Factors.factorize(315))  # Output: [3, 3, 5, 7]

