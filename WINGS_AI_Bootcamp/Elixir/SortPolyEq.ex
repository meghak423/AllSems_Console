defmodule Poly do
  def sort_poly(expr) do
    terms = Regex.scan(~r/[\+\-]?\s*\d*x(\^\d+)?|[\+\-]?\s*\d+/, expr) |> Enum.map(&hd/1)
    sorted = Enum.sort_by(terms, fn t ->
      cond do
        String.contains?(t, "^") ->
          [_x, pow] = String.split(t, "^")
          -String.to_integer(pow)
        String.contains?(t, "x") -> -1
        true -> 0
      end
    end)
    IO.puts Enum.join(sorted, " ")
  end
end

Poly.sort_poly("3x^2 + 5x^4 - 2x + 7")

