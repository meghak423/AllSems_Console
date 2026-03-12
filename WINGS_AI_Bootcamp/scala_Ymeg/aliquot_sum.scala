@main def aliquotSumApp(): Unit =
  import scala.math.sqrt

  def findDivisors(n: Int): List[Int] =
    (1 until n).filter(n % _ == 0).toList

  def aliquotSumA(n: Int): Int =
    findDivisors(n).sum

  def findDivisorsEfficient(n: Int): Set[Int] =
    val limit = math.sqrt(n).toInt
    (1 to limit).flatMap { i =>
      if n % i == 0 then
        val other = n / i
        if i == other || other == n then List(i)
        else List(i, other)
      else Nil
    }.toSet - n

  def aliquotSumB(n: Int): Int =
    findDivisorsEfficient(n).sum

  def aliquotSumC(n: Int): Int =
    var sum = 1
    var f = 2
    while f * f < n do
      if n % f == 0 then
        sum += f + n / f
      f += 1
    if f * f == n then
      sum += f
    sum

  print("Enter a number: ")
  val n = scala.io.StdIn.readInt()

  println(s"Aliquot Sum A (Simple): ${aliquotSumA(n)}")
  println(s"Aliquot Sum B (Efficient): ${aliquotSumB(n)}")
  println(s"Aliquot Sum C (Looping): ${aliquotSumC(n)}")
