defmodule Odometer do
  @limit "123456789"

  def is_valid(n) when n < 10, do: true

  def is_valid(n) do
    if rem(div(n, 10), 10) < rem(n, 10) do
      is_valid(div(n, 10))
    else
      false
    end
  end

  def get_limits(n) do
    size = String.length(Integer.to_string(n))
    start = String.slice(@limit, 0, size) |> String.to_integer()
    limit = String.slice(@limit, -size, size) |> String.to_integer()
    {start, limit}
  end

  def next_reading(reading) do
    {start, limit} = get_limits(reading)

    cond do
      reading == limit -> start
      true ->
        next = reading + 1
        if is_valid(next), do: next, else: next_reading(next)
    end
  end

  def next_reading_k(reading, step \\ 1) do
    Enum.reduce(1..step, reading, fn _, acc -> next_reading(acc) end)
  end

  def prev_reading(reading) do
    {start, limit} = get_limits(reading)

    cond do
      reading == start -> limit
      true ->
        prev = reading - 1
        if is_valid(prev), do: prev, else: prev_reading(prev)
    end
  end

  def prev_reading_k(reading, step \\ 1) do
    Enum.reduce(1..step, reading, fn _, acc -> prev_reading(acc) end)
  end

  def distance(a_reading, b_reading) do
    a_str = Integer.to_string(a_reading)
    b_str = Integer.to_string(b_reading)

    if String.length(a_str) != String.length(b_str) do
      -1
    else
      do_distance(a_reading, b_reading, 0, String.length(a_str) * 10)
    end
  end

  defp do_distance(_curr, _target, count, max) when count > max, do: -1
  defp do_distance(curr, target, count, _max) when curr == target, do: count

  defp do_distance(curr, target, count, max) do
    do_distance(next_reading(curr), target, count + 1, max)
  end
end

IO.inspect(Odometer.next_reading(2468))
IO.inspect(Odometer.next_reading_k(2468, 3))
IO.inspect(Odometer.prev_reading(2468))
IO.inspect(Odometer.prev_reading_k(2468, 3))
IO.inspect(Odometer.distance(2468, 2469))

