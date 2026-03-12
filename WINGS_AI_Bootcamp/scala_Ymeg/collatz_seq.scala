def collatzSequence(n: Int): List[Int] = {
  var ans = List(n)
  var num = n

  while (num != 1) {
    num = if (num % 2 == 0) num / 2 else 3 * num + 1
    ans = ans :+ num
  }
  ans
}

@main def runCollatzSequence(): Unit = {
  val result = collatzSequence(12)
  println(result.mkString(", "))
}
