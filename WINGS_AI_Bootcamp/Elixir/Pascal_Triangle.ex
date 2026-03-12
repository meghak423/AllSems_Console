defmodule Pascal do
  def pascals_triangle(n) do
    Stream.iterate([1], &next_row/1)
    |> Enum.take(n)
  end

  defp next_row(row) do
    left = [0 | row]
    right = row ++ [0]

    Enum.zip(left, right)
    |> Enum.map(fn {a, b} -> a + b end)
  end

  def print_pascals_triangle(n) do
    triangle = pascals_triangle(n)
    last_row_str = Enum.join(List.last(triangle), "   ")
    max_width = String.length(last_row_str)

    Enum.each(triangle, fn row ->
      row_str = Enum.join(row, "   ")
      padding = String.duplicate(" ", div(max_width - String.length(row_str), 2))
      IO.puts(padding <> row_str)
    end)
  end
end

Pascal.print_pascals_triangle(6)

