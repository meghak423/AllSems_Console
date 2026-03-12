import qualified Data.Map as Map
import qualified Data.Set as Set
import Data.List (nub, sort)
import Data.Maybe (fromMaybe)

type Graph = Map.Map Char (Set.Set Char)

buildGraph :: [String] -> Graph
buildGraph attempts = foldl addEdges Map.empty attempts
  where
    addEdges g [a,b,c] = addEdge (addEdge (addNode (addNode (addNode g a) b) c) a b) b c
    addEdges g _ = g

    addNode g n = Map.insertWith Set.union n Set.empty g
    addEdge g from to = Map.insertWith Set.union from (Set.singleton to) g

indegreeMap :: Graph -> Map.Map Char Int
indegreeMap graph = foldl update Map.empty (Map.toList graph)
  where
    update acc (_, neighbors) = foldl (\m n -> Map.insertWith (+) n 1 m) acc (Set.toList neighbors)

topoSort :: Graph -> String
topoSort graph = go initial indegrees ""
  where
    indegrees = indegreeMap graph
    allNodes = Map.keys graph
    initial = sort [n | n <- allNodes, Map.findWithDefault 0 n indegrees == 0]

    go [] _ res = res
    go (n:ns) ind res =
      let neighbors = Map.findWithDefault Set.empty n graph
          (ind', newQueue) = foldl (\(m, q) k ->
                                      let m' = Map.update (\v -> Just (v - 1)) k m
                                      in if fromMaybe 0 (Map.lookup k m') == 0
                                         then (m', sort (k:q))
                                         else (m', q)
                                    ) (ind, ns) (Set.toList neighbors)
      in go newQueue ind' (res ++ [n])

main :: IO ()
main = do
  let attempts = [
        "319", "680", "180", "690", "129", "620", "762", "689",
        "762", "318", "368", "710", "720", "710", "629", "168",
        "160", "689", "716", "731", "736", "729", "316", "729",
        "729", "710", "769", "290", "719", "680", "318", "389",
        "162", "289", "162", "718", "729", "319", "790", "680",
        "890", "362", "319", "760", "316", "729", "380", "319",
        "728", "716"]
  let graph = buildGraph attempts
  putStrLn $ "Derived passcode: " ++ topoSort graph

