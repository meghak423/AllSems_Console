defmodule PrimeCheck do
  def is_prime(n) when n in [2, 3, 5], do: true
  def is_prime(n) when n <= 1 or rem(n, 2) == 0, do: false

  def is_prime(n) do
    check_prime(n, 3)
  end

  defp check_prime(n, r) when r * r > n, do: true
  defp check_prime(n, r) do
    if rem(n, r) == 0 do
      false
    else
      check_prime(n, r + 2)
    end
  end
end

# Hardcoded test
a = 29

if PrimeCheck.is_prime(a) do
  IO.puts("#{a} is a prime number")
else
  IO.puts("#{a} is not a prime number")
end

