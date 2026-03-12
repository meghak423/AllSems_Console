defmodule Rot13 do
  def encode(text) do
    String.to_charlist(text)
    |> Enum.map(&rot13_char/1)
    |> List.to_string()
  end

  defp rot13_char(c) when c in ?a..?z do
    rem(c - ?a + 13, 26) + ?a
  end

  defp rot13_char(c) when c in ?A..?Z do
    rem(c - ?A + 13, 26) + ?A
  end

  defp rot13_char(c), do: c
end

IO.puts Rot13.encode("Hello World!")

