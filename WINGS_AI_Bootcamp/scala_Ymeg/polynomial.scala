def getPower(term: String): Int =
  if term.contains("x^") then term.split("x\\^")(1).toInt
  else if term.contains("x") then 1
  else 0

def sortPolynomial(poly: String): String =
  val normalized = poly.replace("-", "+-")
  val terms = normalized.split("\\+").filter(_.nonEmpty)

  val sorted = terms.sortBy(getPower)

  val result = sorted.map { term =>
    if term.startsWith("-") then term else "+" + term
  }.mkString

  if result.startsWith("+") then result.drop(1) else result

@main def run(): Unit =
  val poly = "7x^3-4x+2x^2+5"
  println(sortPolynomial(poly)) // Output: 5-4x+2x^2+7x^3
