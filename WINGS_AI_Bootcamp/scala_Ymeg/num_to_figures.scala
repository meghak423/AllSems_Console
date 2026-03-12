// object NumberFormatter {
//   def formatNumberIndianWestern(amount: Int): (String, String) = {
//     val western = "%,d".format(amount)

//     def indianGrouping(num: String): String = {
//       val n = num.reverse
//       val firstPart = n.take(3)
//       val rest = n.drop(3).grouped(2).mkString(",")
//       val combined = if (rest.nonEmpty) firstPart + "," + rest else firstPart
//       combined.reverse
//     }

//     val indian = indianGrouping(amount.toString)
//     (indian, western)
//   }

//   def main(args: Array[String]): Unit = {
//     val (indianFmt, westernFmt) = formatNumberIndianWestern(12345678)
//     println(s"Indian format: $indianFmt")
//     println(s"Western format: $westernFmt")
//   }
// }






// object NumberToWords {

//   val under20 = Array("Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
//     "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
//     "Sixteen", "Seventeen", "Eighteen", "Nineteen")

//   val tens = Array("", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety")

//   def twoDigits(num: Int): String = {
//     if (num < 20) under20(num)
//     else tens(num / 10) + (if (num % 10 == 0) "" else " " + under20(num % 10))
//   }

//   def threeDigits(num: Int): String = {
//     if (num == 0) ""
//     else if (num < 100) twoDigits(num)
//     else under20(num / 100) + " Hundred" + (if (num % 100 == 0) "" else " " + twoDigits(num % 100))
//   }

//   def convertWestern(n: Long): String = {
//     val units = Array("", "Thousand", "Million", "Billion")
//     var num = n
//     var i = 0
//     var parts = List[String]()

//     while (num > 0) {
//       val chunk = (num % 1000).toInt
//       if (chunk > 0) {
//         val word = threeDigits(chunk)
//         val label = if (units(i).nonEmpty) " " + units(i) else ""
//         parts = (word + label) :: parts
//       }
//       num /= 1000
//       i += 1
//     }

//     if (parts.isEmpty) "Zero" else parts.mkString(" ")
//   }

//   def convertIndian(n: Long): String = {
//     var num = n
//     val parts = scala.collection.mutable.ListBuffer[String]()

//     val crore = (num / 10000000).toInt
//     if (crore > 0) {
//       parts += twoDigits(crore) + " Crore"
//       num %= 10000000
//     }

//     val lakh = (num / 100000).toInt
//     if (lakh > 0) {
//       parts += twoDigits(lakh) + " Lakh"
//       num %= 100000
//     }

//     val thousand = (num / 1000).toInt
//     if (thousand > 0) {
//       parts += twoDigits(thousand) + " Thousand"
//       num %= 1000
//     }

//     if (num > 0) {
//       parts += threeDigits(num.toInt)
//     }

//     if (parts.isEmpty) "Zero" else parts.mkString(" ")
//   }

//   def main(args: Array[String]): Unit = {
//     val num = 12345678L
//     println("Indian Format: " + convertIndian(num))
//     println("Western Format: " + convertWestern(num))
//   }
// }









object NumberToWords:

  val under20 = Array("Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
    "Sixteen", "Seventeen", "Eighteen", "Nineteen")

  val tens = Array("", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety")

  def twoDigits(num: Int): String =
    if num < 20 then under20(num)
    else tens(num / 10) + (if num % 10 == 0 then "" else " " + under20(num % 10))

  def threeDigits(num: Int): String =
    if num == 0 then ""
    else if num < 100 then twoDigits(num)
    else
      val hundreds = under20(num / 100) + " Hundred"
      if num % 100 == 0 then hundreds else s"$hundreds ${twoDigits(num % 100)}"

  def convertWestern(n: Long): String =
    val units = Array("", "Thousand", "Million", "Billion")
    var num = n
    var i = 0
    var parts = List.empty[String]

    while num > 0 do
      val chunk = (num % 1000).toInt
      if chunk > 0 then
        val label = if units(i).nonEmpty then " " + units(i) else ""
        parts = (threeDigits(chunk) + label) :: parts
      num /= 1000
      i += 1

    if parts.isEmpty then "Zero" else parts.mkString(" ")

  def convertIndian(n: Long): String =
    var num = n
    val parts = scala.collection.mutable.ListBuffer.empty[String]

    val crore = (num / 10000000).toInt
    if crore > 0 then
      parts += s"${twoDigits(crore)} Crore"
      num %= 10000000

    val lakh = (num / 100000).toInt
    if lakh > 0 then
      parts += s"${twoDigits(lakh)} Lakh"
      num %= 100000

    val thousand = (num / 1000).toInt
    if thousand > 0 then
      parts += s"${twoDigits(thousand)} Thousand"
      num %= 1000

    if num > 0 then parts += threeDigits(num.toInt)

    if parts.isEmpty then "Zero" else parts.mkString(" ")

  @main def runNumberToWords(): Unit =
    val num = 12345678L
    println("Indian Format:  " + convertIndian(num))
    println("Western Format: " + convertWestern(num))
