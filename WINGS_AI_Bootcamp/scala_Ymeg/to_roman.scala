def intToRoman(num: Int): String =
  val valSyms = List(
    1000 -> "M", 900 -> "CM", 500 -> "D", 400 -> "CD",
    100 -> "C", 90 -> "XC", 50 -> "L", 40 -> "XL",
    10 -> "X", 9 -> "IX", 5 -> "V", 4 -> "IV", 1 -> "I"
  )

  var n = num
  val builder = new StringBuilder
  for (value, symbol) <- valSyms do
    while n >= value do
      builder.append(symbol)
      n -= value
  builder.toString

def romanToInt(s: String): Int =
  val romanMap = Map('I' -> 1, 'V' -> 5, 'X' -> 10, 'L' -> 50,
                     'C' -> 100, 'D' -> 500, 'M' -> 1000)

  s.reverse.foldLeft((0, 0)) { case ((total, prev), ch) =>
    val curr = romanMap(ch)
    if curr < prev then (total - curr, curr)
    else (total + curr, curr)
  }._1

@main def runRomanConverter(): Unit =
  println(romanToInt("MCMXCIV"))  // 1994
  println(intToRoman(1994))       // MCMXCIV
