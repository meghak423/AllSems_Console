defmodule Diamond do
  @star "*"
  @width 60

  defp start(_atom, _k), do: @star

  defp repeat(_atom, k), do: String.duplicate(@star <> @star, k)

  defp stop(_atom, _k), do: ""

  defp line(k) do
    start(@star, k) <> repeat(@star, k) <> stop("", k)
  end

  defp pattern(size) do
    Enum.map(0..(size - 1), &line/1)
  end

  def make_diamond(size) do
    half = if rem(size, 2) == 0, do: div(size, 2), else: div(size + 1, 2)
    top = pattern(half)
    bottom = Enum.reverse(pattern(size - half))
    (top ++ bottom)
    |> Enum.map(&String.pad_leading(&1, div(@width + String.length(&1), 2)))
    |> Enum.join("\n")
  end
end

# Run this to print the diamond
IO.puts Diamond.make_diamond(8)
