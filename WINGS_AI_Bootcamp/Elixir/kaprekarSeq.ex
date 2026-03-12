defmodule Sequence do
  def generate(n) do
    IO.puts(n)
    next = next_number(n)
    if next == n do
      :ok
    else
      generate(next)
    end
  end

  defp next_number(num) do
    digits = Integer.digits(num)
    largest = digits |> Enum.sort(&>=/2) |> Enum.join() |> String.to_integer()
    smallest = digits |> Enum.sort() |> Enum.join() |> String.to_integer()
    largest - smallest
  end
end

# Example usage:
Sequence.generate(1729)

