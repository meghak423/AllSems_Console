defmodule Shape do
  @star "*"
  @width 60

  # Build a line with 1 + (2 * k) stars
  defp line(k) do
    @star <> String.duplicate(@star <> @star, k)
  end

  # Center a line within @width
  defp center(line), do: String.pad_leading(line, div(@width + String.length(line), 2))

  # Create centered lines for pyramid
  def make_pyramid(size) do
    0..(size - 1)
    |> Enum.map(&line/1)
    |> Enum.map(&center/1)
    |> Enum.join("\n")
  end

  # Create centered lines for diamond
  def make_diamond(size) do
    half = if rem(size, 2) == 0, do: div(size, 2), else: div(size + 1, 2)

    top =
      0..(half - 1)
      |> Enum.map(&line/1)

    bottom =
      (size - half - 1)..0
      |> Enum.map(&line/1)

    (top ++ bottom)
    |> Enum.map(&center/1)
    |> Enum.join("\n")
  end 
end

IO.puts Shape.make_pyramid(7)
IO.puts Shape.make_diamond(8)
