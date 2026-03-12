defmodule Sieve do
  def sieve_of_eratosthenes(n) do
    if n < 2 do
      []
    else
      list = Enum.to_list(2..n)
      sieve(list, [])
      |> Enum.reverse()
    end
  end

  defp sieve([], primes), do: primes

  defp sieve([p | rest], primes) do
    filtered = Enum.filter(rest, fn x -> rem(x, p) != 0 end)
    sieve(filtered, [p | primes])
  end
end

IO.inspect(Sieve.sieve_of_eratosthenes(30))

