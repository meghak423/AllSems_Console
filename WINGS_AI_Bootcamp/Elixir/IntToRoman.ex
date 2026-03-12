defmodule Roman do
  @val [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  @sym ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]

  def int_to_roman(num), do: int_to_roman(num, @val, @sym, "")

  defp int_to_roman(0, _val, _sym, acc), do: acc

  defp int_to_roman(num, [v | vt], [s | st], acc) when num >= v do
    int_to_roman(num - v, [v | vt], [s | st], acc <> s)
  end

  defp int_to_roman(num, [_v | vt], [_s | st], acc) do
    int_to_roman(num, vt, st, acc)
  end
end

IO.puts Roman.int_to_roman(1994)  # Output: MCMXCIV

