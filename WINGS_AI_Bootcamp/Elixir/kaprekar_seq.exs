defmodule DigitSequence do
  @moduledoc """
  Generates a sequence where each number is the result of
  subtracting the smallest permutation from the largest permutation
  of its digits, until the sequence repeats.
  """

  @doc "Converts an integer into a list of digit characters (strings)."
  @spec get_digits(integer()) :: [String.t()]
  def get_digits(number) do
    Integer.to_string(number)
    |> String.graphemes()
  end

  @doc "Forms the smallest number from the digit list."
  @spec form_smallest_number([String.t()]) :: integer()
  def form_smallest_number(digits) do
    sorted = Enum.sort(digits)
    joined = Enum.join(sorted)
    String.to_integer(joined)
  end

  @doc "Forms the largest number from the digit list."
  @spec form_largest_number([String.t()]) :: integer()
  def form_largest_number(digits) do
    sorted = Enum.sort(digits, :desc)
    joined = Enum.join(sorted)
    String.to_integer(joined)
  end

  @doc "Computes the digit difference between largest and smallest formed numbers."
  @spec compute_digit_difference(integer()) :: integer()
  def compute_digit_difference(number) do
    digits = get_digits(number)
    largest = form_largest_number(digits)
    smallest = form_smallest_number(digits)
    largest - smallest
  end

# @doc for documentation but not printed in output - it is machine understandable

  @doc "Generates the sequence of numbers until a repetition occurs."
  @spec generate_sequence(non_neg_integer()) :: [non_neg_integer()]
  def generate_sequence(start) do
    do_generate_sequence(start, [])
  end

  @spec do_generate_sequence(non_neg_integer(), [non_neg_integer()]) :: [non_neg_integer()]
  defp do_generate_sequence(current, history) do
    if Enum.member?(history, current) do
      history ++ [current]
    else
      next = compute_digit_difference(current)
      new_history = history ++ [current]
      do_generate_sequence(next, new_history)
    end
  end
end

IO.inspect(DigitSequence.generate_sequence(12), label: "Generated sequence")

