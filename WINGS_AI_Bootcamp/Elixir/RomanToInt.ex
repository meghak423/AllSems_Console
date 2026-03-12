defmodule Roman do
  @roman_map %{
    "I" => 1, "V" => 5, "X" => 10,
    "L" => 50, "C" => 100, "D" => 500, "M" => 1000
  }

  def roman_to_int(s) do
    s
    |> String.graphemes()
    |> Enum.reverse()
    |> do_convert(0, 0)
  end

  defp do_convert([], _prev, total), do: total

  defp do_convert([h | t], prev, total) do
    val = Map.get(@roman_map, h)
    if val < prev do
      do_convert(t, val, total - val)
    else
      do_convert(t, val, total + val)
    end
  end
end

# Example usage
IO.puts Roman.roman_to_int("MCMXCIV") # 1994

