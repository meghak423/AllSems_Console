defmodule Euler79 do
  def derive_passcode(attempts) do
    edges = Enum.reduce(attempts, %{}, fn attempt, acc ->
      [a, b, c] = String.graphemes(attempt)
      acc
      |> Map.update(a, MapSet.new([b]), &MapSet.put(&1, b))
      |> Map.update(b, MapSet.new([c]), &MapSet.put(&1, c))
      |> Map.put_new(c, MapSet.new())
    end)

    all_nodes = Map.keys(edges)

    # Fix: use _k to silence warning about unused variable
    indegree = Enum.reduce(edges, %{}, fn {_k, vs}, acc ->
      Enum.reduce(vs, acc, fn v, acc2 -> Map.update(acc2, v, 1, &(&1 + 1)) end)
    end)

    queue = Enum.filter(all_nodes, fn k -> Map.get(indegree, k, 0) == 0 end)
    topo_sort(queue, edges, indegree, "")
  end

  defp topo_sort([], _edges, _indegree, result), do: result

  defp topo_sort(queue, edges, indegree, result) do
    [node | rest] = Enum.sort(queue)
    result = result <> node

    {indegree, new_queue} =
      Enum.reduce(Map.get(edges, node, MapSet.new()), {indegree, rest}, fn neighbor, {ind, q} ->
        updated = Map.update!(ind, neighbor, &(&1 - 1))

        if updated[neighbor] == 0 do
          {updated, [neighbor | q]}
        else
          {updated, q}
        end
      end)

    topo_sort(new_queue, edges, indegree, result)
  end
end

# Usage:
attempts = [
  "319", "680", "180", "690", "129", "620", "762", "689",
  "762", "318", "368", "710", "720", "710", "629", "168",
  "160", "689", "716", "731", "736", "729", "316", "729",
  "729", "710", "769", "290", "719", "680", "318", "389",
  "162", "289", "162", "718", "729", "319", "790", "680",
  "890", "362", "319", "760", "316", "729", "380", "319",
  "728", "716"
]

IO.puts("Derived passcode: #{Euler79.derive_passcode(attempts)}")

