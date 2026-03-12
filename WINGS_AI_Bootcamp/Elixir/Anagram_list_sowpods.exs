defmodule Anagram do
  def anagram_list(file_path) do
    stream = File.stream!(file_path)
    trimmed = Stream.map(stream, fn line -> String.trim(line) end)
    lowered = Stream.map(trimmed, fn word -> String.downcase(word) end)
    words = Enum.to_list(lowered)

    anagram_map = Enum.reduce(words, %{}, fn word, acc ->
      graphemes = String.graphemes(word)
      sorted_graphemes = Enum.sort(graphemes)
      key = Enum.join(sorted_graphemes)
      Map.update(acc, key, [word], fn existing -> [word | existing] end)
    end)

    Enum.each(anagram_map, fn {_key, group} ->
      if length(group) > 1 do
        sorted_group = Enum.sort(group)
        line = Enum.join(sorted_group, " ")
        IO.puts(line)
      end
    end)
  end
end

# Call the function
Anagram.anagram_list("sowpods.txt")

