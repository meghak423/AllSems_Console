@main def digitalRoot(): Unit =
  def digitalRoot(n: Int): Int =
    if n == 0 then 0
    else 1 + (n - 1) % 9

  print("Enter a number: ")
  val n = scala.io.StdIn.readInt()
  println(s"Digital Root: ${digitalRoot(n)}")
