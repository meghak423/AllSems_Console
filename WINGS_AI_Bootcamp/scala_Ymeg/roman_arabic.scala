// object RomanConverter {

//   def toRoman(n: Int): String = {
//     val symbols = List(
//       1000 -> "M", 900 -> "CM", 500 -> "D", 400 -> "CD",
//       100 -> "C", 90 -> "XC", 50 -> "L", 40 -> "XL",
//       10 -> "X", 9 -> "IX", 5 -> "V", 4 -> "IV", 1 -> "I"
//     )

//     var number = n
//     val sb = new StringBuilder

//     for ((value, symbol) <- symbols) {
//       val count = number / value
//       sb.append(symbol * count)
//       number %= value
//     }

//     sb.toString()
//   }

//   def toArabic(roman: String): Int = {
//     val converter = Map(
//       'M' -> 1000, 'D' -> 500, 'C' -> 100, 'L' -> 50,
//       'X' -> 10, 'V' -> 5, 'I' -> 1
//     )

//     val expanded = roman
//       .replace("CM", "DCCCC").replace("CD", "CCCC")
//       .replace("XC", "LXXXX").replace("XL", "XXXX")
//       .replace("IX", "VIIII").replace("IV", "IIII")

//     expanded.map(converter).sum
//   }
// }

// object Main {
//   def main(args: Array[String]): Unit = {
//     val number = 1987
//     val roman = RomanConverter.toRoman(number)
//     val arabic = RomanConverter.toArabic(roman)

//     println(roman)
//     println(arabic)
//   }
// }








def toRoman(n: Int): String =
  val symbols = List(
    1000 -> "M", 900 -> "CM", 500 -> "D", 400 -> "CD",
    100 -> "C", 90 -> "XC", 50 -> "L", 40 -> "XL",
    10 -> "X", 9 -> "IX", 5 -> "V", 4 -> "IV", 1 -> "I"
  )

  var number = n
  val sb = new StringBuilder

  for (value, symbol) <- symbols do
    val count = number / value
    sb.append(symbol * count)
    number %= value

  sb.toString()

def toArabic(roman: String): Int =
  val converter = Map(
    'M' -> 1000, 'D' -> 500, 'C' -> 100, 'L' -> 50,
    'X' -> 10, 'V' -> 5, 'I' -> 1
  )

  val expanded = roman
    .replace("CM", "DCCCC").replace("CD", "CCCC")
    .replace("XC", "LXXXX").replace("XL", "XXXX")
    .replace("IX", "VIIII").replace("IV", "IIII")

  expanded.map(converter).sum

@main def runRomanConverter(): Unit =
  val number = 1987
  val roman = toRoman(number)
  val arabic = toArabic(roman)

  println(s"Roman numeral: $roman")
  println(s"Converted back to Arabic: $arabic")
