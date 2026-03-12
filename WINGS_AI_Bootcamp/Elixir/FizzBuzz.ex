defmodule FizzBuzz do
  def run(n \\ 1) when n > 100, do: :ok
  def run(n) do
    cond do
      rem(n, 15) == 0 -> IO.puts("FizzBuzz")
      rem(n, 3) == 0 -> IO.puts("Fizz")
      rem(n, 5) == 0 -> IO.puts("Buzz")
      true -> IO.puts(n)
    end
    run(n + 1)
  end
end

FizzBuzz.run()

