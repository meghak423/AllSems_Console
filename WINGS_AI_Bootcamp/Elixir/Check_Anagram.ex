defmodule Anagram do
  def clean(s) do
    lowered = String.downcase(s)
    String.replace(lowered, ~r/[^a-z0-9]/, "")
  end

  def frequency_map(list) do
    Enum.reduce(list, %{}, fn char, acc ->
      count = Map.get(acc, char, 0)
      Map.put(acc, char, count + 1)
    end)
  end

  def is_anagram_clean(s1, s2) do
    freq1 = frequency_map(String.graphemes(clean(s1)))
    freq2 = frequency_map(String.graphemes(clean(s2)))
    freq1 == freq2
  end

  def is_anagram(s1, s2) do
    chars1 = String.graphemes(s1)
    chars2 = String.graphemes(s2)
    sorted1 = Enum.sort(chars1)
    sorted2 = Enum.sort(chars2)
    sorted1 == sorted2
  end
end

IO.puts Anagram.is_anagram("silet", "listen")       # false
IO.puts Anagram.is_anagram_clean("tan", "ant")      # true

