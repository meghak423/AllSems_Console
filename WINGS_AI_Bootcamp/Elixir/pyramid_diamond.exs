defmodule Shape do
  @star "*"
  @space " "
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

  defp center_line(line) do
    String.pad_leading(line, div(@width + String.length(line), 2))
  end

  def make_pyramid(size) do
    pattern(size)
    |> Enum.map(&center_line/1)
    |> Enum.join("\n")
  end

  def make_diamond(size) do
    half = if rem(size, 2) == 0, do: div(size, 2), else: div(size + 1, 2)
    top = pattern(half)
    bottom = Enum.reverse(pattern(size - half))

    (top ++ bottom)
    |> Enum.map(&center_line/1)
    |> Enum.join("\n")
  end
end

IO.puts Shape.make_pyramid(7)
IO.puts Shape.make_diamond(8)
