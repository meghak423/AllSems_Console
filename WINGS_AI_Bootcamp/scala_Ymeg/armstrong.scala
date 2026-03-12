import scala.io.StdIn.readInt

def countDigits(n: Int): Int =
  n.toString.length

def powerSum(n: Int, digits: Int): Int =
  n.toString.map(_.asDigit).map(d => Math.pow(d, digits)).sum.toInt

def isArmstrong(n: Int): Boolean =
  val digits = countDigits(n)
  powerSum(n, digits) == n

def generateArmstrong(limit: Int): List[Int] =
  (1 to limit).filter(isArmstrong).toList

@main def run(): Unit =
  val n = readInt()
  println(generateArmstrong(n))
