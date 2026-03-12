@main def checkNumber(): Unit = {
  def aliquotB(n: Int): Int = {
    var aliq = 1
    var factor = 2
    while (factor * factor < n) {
      if (n % factor == 0) {
        aliq += factor + (n / factor)
      }
      factor += 1
    }
    if (factor * factor == n) {
      aliq += factor
    }
    aliq
  }

  def checkNum(n: Int): Int = {
    val aliq = aliquotB(n)
    if (n == aliq) 1
    else if (n < aliq) 2
    else 3
  }

  val n = scala.io.StdIn.readInt()
  val ans = checkNum(n)
  ans match {
    case 1 => println("Perfect Number")
    case 2 => println("Deficient Number")
    case 3 => println("Abundant Number")
  }
}
