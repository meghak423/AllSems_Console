// 



@main def fizzBuzz(): Unit =
  def fizzBuzzList(limit: Int): List[String] =
    (1 to limit).map { i =>
      if i % 15 == 0 then "Fizz Buzz"
      else if i % 3 == 0 then "Fizz"
      else if i % 5 == 0 then "Buzz"
      else i.toString
    }.toList

  val result = fizzBuzzList(16)
  println(result)
