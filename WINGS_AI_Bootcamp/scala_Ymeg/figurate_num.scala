object NumberChecks:

  def isSquare(n: Int): Boolean =
    val root = math.sqrt(n.toDouble).toInt
    root * root == n

  def isCube(n: Int): Boolean =
    val root = math.round(math.cbrt(n.toDouble)).toInt
    root * root * root == n

  def isPowerOf2(n: Int): Boolean =
    n > 0 && (n & (n - 1)) == 0

@main def runChecks(): Unit =
  println(NumberChecks.isSquare(25))   // true
  println(NumberChecks.isCube(343))    // true
  println(NumberChecks.isPowerOf2(9))  // false
  println(NumberChecks.isPowerOf2(8))  // true
