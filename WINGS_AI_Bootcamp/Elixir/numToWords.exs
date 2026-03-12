defmodule NumberToWords do
  @ones ~w(zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen)
  @tens ~w(zero ten twenty thirty forty fifty sixty seventy eighty ninety)

  @indian_units [
    {10000000, "crore"},
    {100000, "lakh"},
    {1000, "thousand"},
    {100, "hundred"}
  ]

  @western_units [
    {1_000_000_000, "billion"},
    {1_000_000, "million"},
    {1000, "thousand"},
    {100, "hundred"}
  ]

  def convert(n, :indian) when n < 100_00_00_000, do: to_words(n, @indian_units)
  def convert(n, :western) when n < 1_000_000_000, do: to_words(n, @western_units)

  defp to_words(0, _), do: "zero"
  defp to_words(n, units) do
    build_words(n, units) |> Enum.join(" ") |> String.trim()
  end

  defp build_words(n, units) do
    Enum.reduce(units, {n, []}, fn {val, label}, {num, acc} ->
      if num >= val do
        div_part = div(num, val)
        rem_part = rem(num, val)
        words = build_words(div_part, @indian_units)
        {rem_part, acc ++ words ++ [label]}
      else
        {num, acc}
      end
    end)
    |> then(fn {num, acc} ->
      acc ++ two_digit_words(num)
    end)
  end

  defp two_digit_words(0), do: []
  defp two_digit_words(n) when n < 20, do: [Enum.at(@ones, n)]
  defp two_digit_words(n) do
    tens = div(n, 10)
    ones = rem(n, 10)
    [Enum.at(@tens, tens)] ++ if ones > 0, do: [Enum.at(@ones, ones)], else: []
  end
end

# Example usage
IO.puts NumberToWords.convert(12345678, :indian)
IO.puts NumberToWords.convert(12345678, :western)


