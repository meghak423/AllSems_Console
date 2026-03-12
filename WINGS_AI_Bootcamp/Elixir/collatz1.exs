defmodule Collatz do
  def next(k) do
    if rem(k, 2) == 0 do
      div(k, 2)
    else
      3 * k + 1
    end
  end

  def sequence(n) do
    generate_sequence(n, [n])
  end

  defp generate_sequence(1, seq), do: Enum.reverse(seq)

  defp generate_sequence(k, seq) do
    next_number = next(k)
    generate_sequence(next_number, [next_number | seq])
  end
end 

res = Collatz.sequence(5)
IO.inspect(res)
