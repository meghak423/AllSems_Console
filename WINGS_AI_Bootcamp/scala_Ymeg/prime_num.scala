import scala.io.StdIn.readInt
import scala.math.sqrt

def checkPrime(n: Int): Boolean =
  if n == 1 then false
  else if n == 2 then true
  else
    for i <- 2 to sqrt(n).toInt do
      if n % i == 0 then return false
    true

@main def run(): Unit =
  val num = readInt()
  if checkPrime(num) then
    println("True")
  else
    println("False")
