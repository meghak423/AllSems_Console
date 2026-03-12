import scala.io.Source
import scala.collection.mutable
import scala.annotation.tailrec

@main def keylogSolver(): Unit = {
  val combos = Source.fromFile("/home/hp/Documents/Keylog.txt").getLines().map(_.trim).toSet
  println(s"Number of combos: ${combos.size}")
  println(s"Combos: $combos")

  val firsts = combos.map(_(0))
  val middles = combos.map(_(1))
  val lasts = combos.map(_(2))

  println(s"Firsts: $firsts")
  println(s"Middles: $middles")
  println(s"Lasts: $lasts")

  val digits = (firsts ++ middles ++ lasts).toList.sorted
  println(s"All digits: $digits")

  // Check if all characters of combo appear in order in passcode
  def isInOrder(passcode: String, combo: String): Boolean = {
    passcode.indexOf(combo(0)) < passcode.indexOf(combo(1)) &&
    passcode.indexOf(combo(1)) < passcode.indexOf(combo(2))
  }

  def allInOrder(passcode: String, combos: Set[String]): Boolean =
    combos.forall(isInOrder(passcode, _))

  // Generate all permutations of digits with length equal to digits.size
  def permutations[A](list: List[A]): List[List[A]] = list match {
    case Nil => List(Nil)
    case _ => for {
      elem <- list
      rest <- permutations(list.filterNot(_ == elem))
    } yield elem :: rest
  }

  // Generate candidate passcodes as strings
  val candidates = permutations(digits).map(_.mkString)

  println(s"Generated ${candidates.size} candidates")

  val validPasscodes = candidates.filter(allInOrder(_, combos))

  println(s"Valid passcodes found: $validPasscodes")
}
