import scala.io.Source
import scala.collection.mutable

def printAnagrams(filename: String): Unit =
  val anagrams = mutable.Map[String, List[String]]().withDefaultValue(Nil)

  for line <- Source.fromFile(filename).getLines() do
    val word = line.trim
    if word.nonEmpty then
      val key = word.sorted
      anagrams(key) = word :: anagrams(key)

  for group <- anagrams.values if group.size > 1 do
    println(group.reverse.mkString(", "))

@main def run(): Unit =
  print("Enter the filename: ")
  val filename = scala.io.StdIn.readLine()
  printAnagrams(filename)
