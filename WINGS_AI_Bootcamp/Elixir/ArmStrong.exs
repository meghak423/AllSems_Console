defmodule ArmstrongNumbers do
  def is_armstrong?(n) do
    digits = Integer.digits(n)  
    num_digits = length(digits)  
    sum_of_powers = Enum.reduce(digits, 0, fn digit, acc ->
      acc + :math.pow(digit, num_digits)
    end)
    sum_of_powers == n
  end

  def generate_armstrong_numbers(start_range, end_range) do
    start_range..end_range
    |> Enum.filter(&is_armstrong?(&1)) 
  end
end

start_range = 100
end_range = 9999

armstrong_numbers = ArmstrongNumbers.generate_armstrong_numbers(start_range, end_range)
IO.inspect(armstrong_numbers)
