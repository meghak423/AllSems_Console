@main def pascalTriangleZip(): Unit =
  val n = 10
  val result = pascalTriangle(n)
  result.foreach(println)

def pascalTriangle(n: Int): List[String] =
  def nextRow(row: List[Int]): List[Int] =
    (0 +: row, row :+ 0).zipped.map(_ + _)

  def loop(row: List[Int], k: Int, acc: List[List[Int]]): List[List[Int]] =
    if k == 0 then acc
    else loop(nextRow(row), k - 1, acc :+ row)

  val triangle = loop(List(1), n, List())
  triangle.map(_.mkString(" "))
