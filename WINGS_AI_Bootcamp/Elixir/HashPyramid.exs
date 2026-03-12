defmodule HashPyramid do
  @moduledoc """
  Generates a pyramid pattern using '#' and '+' symbols.
  Each line starts and ends with a '#', with '+' in between,
  spaced evenly and centered.
  """

  # Constants
  @hash "#"
  @plus "+"
  @lf "\n"
  @width 60

  @doc "Generates the pyramid lines as a list of strings."
  def pattern(size) do
    Enum.map(0..(size - 1), fn k -> line(k) end)
  end

  @doc "Creates a single line in the pyramid."
  def line(0), do: @hash

  def line(k) do
    middle = List.duplicate(@plus, 2 * k - 1)
    full = [@hash] ++ middle ++ [@hash]
    Enum.join(full, "   ")
  end

  @doc "Creates the full centered pyramid string."
  def hash_pyramid(size) do
    lines = pattern(size)

    centered_lines = Enum.map(lines, fn line ->
      len = String.length(line)
      String.pad_leading(line, div(@width + len, 2))
    end)

    Enum.join(centered_lines, @lf)
  end
end

IO.puts(HashPyramid.hash_pyramid(4))
