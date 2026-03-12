defmodule Classifier do
  def relation(a, b) when a < b, do: "<"
  def relation(a, b) when a == b, do: "="
  def relation(_a, _b), do: ">"

  def squeeze(str) do
    do_squeeze(String.graphemes(str))
    |> Enum.join()
  end

  defp do_squeeze([a, b | rest]) when a == b do
    do_squeeze([b | rest])
  end

  defp do_squeeze([a | rest]), do: [a | do_squeeze(rest)]
  defp do_squeeze([]), do: []

  def classify(text) when is_binary(text) do
    sig =
      text
      |> String.graphemes()
      |> Enum.chunk_every(2, 1, :discard)
      |> Enum.map(fn [a, b] -> relation(a, b) end)
      |> Enum.join()
      |> squeeze()

    case sig do
      "<" -> "A"
      ">" -> "D"
      "<>" -> "P"
      "><" -> "V"
      _ -> "X"
    end
  end
end

# Example Usage
IO.puts(Classifier.classify("abc"))    # A
IO.puts(Classifier.classify("cba"))    # D
IO.puts(Classifier.classify("abcba"))  # P
IO.puts(Classifier.classify("cbabc"))  # V
IO.puts(Classifier.classify("abdca"))  # X

