defmodule Anagram do
  def print_anagrams(file_path) do
    stream = File.stream!(file_path)
    words = Enum.map(stream, fn line -> String.downcase(String.trim(line)) end)

    anagram_map =
      Enum.reduce(words, %{}, fn word, acc ->
        key = Enum.join(Enum.sort(String.graphemes(word)))
        Map.update(acc, key, [word], fn existing -> [word | existing] end)
      end)

    values = Map.values(anagram_map)
    filtered = Enum.filter(values, fn group -> length(group) > 1 end)
    sorted_groups = Enum.map(filtered, fn group -> Enum.sort(group) end)
    final_output = Enum.sort(sorted_groups)

    Enum.each(final_output, fn group ->
      IO.puts(Enum.join(group, " "))
    end)
  end
end

Anagram.print_anagrams("sowpods.txt")





# OR


defmodule Anagrams do
  def print_anagrams(file_path) do
    words = Enum.map(File.stream!(file_path), fn line -> 
      String.downcase(String.trim(line)) 
    end)

    anagrams =
      Enum.reduce(words, %{}, fn word, acc ->
        key = Enum.join(Enum.sort(String.graphemes(word)))
        Map.update(acc, key, [word], fn existing -> [word | existing] end)
      end)

    groups = Enum.filter(Map.values(anagrams), fn group -> length(group) > 1 end)

    # Sort each group alphabetically
    sorted_groups = Enum.map(groups, fn group -> Enum.sort(group) end)

    # Sort all groups alphabetically (by first word then others)
    fully_sorted_groups = Enum.sort(sorted_groups)

    Enum.each(fully_sorted_groups, fn group ->
      IO.puts(Enum.join(group, " "))
    end)
  end
end

Anagrams.print_anagrams("sowpods.txt")

