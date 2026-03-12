defmodule RandomDemo do
  def random_picks(n \\ 30) do
    :rand.seed(:exsplus, {123, 456, 789})
    Enum.map(1..n, fn _ -> :rand.uniform(100) end)
  end

  def digit_counts(n) do
    :rand.seed(:exsplus, {321, 654, 987})
    Enum.reduce(1..n, Map.new(0..9, fn x -> {x, 0} end), fn _, acc ->
      r = :rand.uniform(10) - 1
      Map.update!(acc, r, &(&1 + 1))
    end)
  end

  def average(n) do
    :rand.seed(:exsplus, {101, 202, 303})
    total = Enum.reduce(1..n, 0, fn _, acc ->
      acc + (:rand.uniform(10) - 1)
    end)
    total / n
  end
end

IO.inspect RandomDemo.random_picks()
IO.inspect RandomDemo.digit_counts(1_000_000)
IO.inspect RandomDemo.average(1_000_000)

