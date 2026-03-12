@main def numberToWords(n: Long): Unit = {
  val ones = Array("", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen")
  val tens = Array("", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety")

  def twoDigits(num: Int): String =
    if (num < 20) ones(num)
    else tens(num / 10) + (if (num % 10 != 0) " " + ones(num % 10) else "")

  def threeDigits(num: Int): String =
    if (num == 0) ""
    else if (num < 100) twoDigits(num)
    else ones(num / 100) + " Hundred" + (if (num % 100 != 0) " " + twoDigits(num % 100) else "")

  def convertIndian(num: Long): String = {
    if (num == 0) return "Zero"
    val parts = Array(
      (10000000, "Crore"),
      (100000, "Lakh"),
      (1000, "Thousand"),
      (100, "Hundred")
    )

    var n = num
    val sb = new StringBuilder

    for ((divisor, label) <- parts) {
      val part = (n / divisor).toInt
      if (part > 0) {
        if (divisor == 100) sb.append(ones(part)).append(" ").append(label)
        else sb.append(threeDigits(part)).append(" ").append(label)
        sb.append(" ")
        n %= divisor
      }
    }


    if (n > 0) sb.append(twoDigits(n.toInt))
    sb.toString.trim
  }

  println(convertIndian(n))
}
