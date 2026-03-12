defmodule Odometer do
  defstruct size: 0, start: 0, limit: 0, reading: 0

  def new(size) when size > 0 do
    start = String.slice("123456789", 0, size) |> String.to_integer()
    limit = String.slice("123456789", -size, size) |> String.to_integer()
    %Odometer{size: size, start: start, limit: limit, reading: start}
  end

  defp is_ascending(n) do
    s = Integer.to_string(n)
    chars = String.graphemes(s)
    Enum.all?(Enum.chunk_every(chars, 2, 1, :discard), fn [a, b] -> a < b end)
  end

  defp next_reading(n, limit, start) do
    cond do
      n == limit -> start
      true ->
        Stream.iterate(n + 1, &(&1 + 1))
        |> Enum.find(&is_ascending/1)
    end
  end

  defp prev_reading(n, limit, start) do
    cond do
      n == start -> limit
      true ->
        Stream.iterate(n - 1, &(&1 - 1))
        |> Enum.find(&is_ascending/1)
    end
  end

  def next(odo, step \\ 1) do
    Enum.reduce(1..step, odo, fn _, od ->
      new_reading = next_reading(od.reading, od.limit, od.start)
      %Odometer{od | reading: new_reading}
    end)
  end

  def prev(odo, step \\ 1) do
    Enum.reduce(1..step, odo, fn _, od ->
      new_reading = prev_reading(od.reading, od.limit, od.start)
      %Odometer{od | reading: new_reading}
    end)
  end

  def distance(odo1, odo2) do
    if odo1.size != odo2.size do
      -1
    else
      Stream.iterate(odo1.reading, fn n ->
        if n == odo1.limit, do: odo1.start, else: next_reading(n, odo1.limit, odo1.start)
      end)
      |> Enum.find_index(&(&1 == odo2.reading))
    end
  end

  def to_string(odo), do: Integer.to_string(odo.reading)
end

# Usage:

a = Odometer.new(5)
a = Odometer.next(a)
IO.puts("Next: #{Odometer.to_string(a)}")

b = Odometer.new(5)
b = Odometer.prev(b)
IO.puts("Prev: #{Odometer.to_string(b)}")

dist = Odometer.distance(b, a)
IO.puts("Distance: #{dist}")
