import scala.io.StdIn.readInt
import scala.math.sqrt

// def isPrime(n: Int): Boolean =
//   if n <= 1 then false
//   else if n == 2 then true
//   else if n % 2 == 0 then false
//   else
//     for i <- 3 to sqrt(n).toInt by 2 do
//       if n % i == 0 then return false
//     true

// def largestPrimeFactor(n: Int): Int =
//   var largest = -1
//   for i <- 2 to sqrt(n).toInt do
//     if n % i == 0 then
//       if isPrime(i) then
//         largest = largest.max(i)
//       val paired = n / i
//       if isPrime(paired) then
//         largest = largest.max(paired)
//   if isPrime(n) then
//     largest = largest.max(n)
//   largest

// @main def run(): Unit =
//   val num = readInt()
//   println(largestPrimeFactor(num))











@main def largestPrimeFactor(): Unit = {
  def factorize(n: Long): List[Long] = {
    var num = n
    var factors = List.empty[Long]

    // Divide out 2s
    while (num % 2 == 0) {
      factors = 2 :: factors
      num /= 2
    }

    var r = 3L
    while (r * r <= num) {
      while (num % r == 0) {
        factors = r :: factors
        num /= r
      }
      r += 2
    }

    if (num > 2) factors = num :: factors

    factors.reverse
  }

  val num = 600851475143L
  val factors = factorize(num)
  println(s"Prime factors of $num: $factors")
  println(s"Largest prime factor: ${factors.max}")

  // Test with 3
  println(s"Factors of 3: ${factorize(3)}")
}
