def check(num: Int): Boolean =
  num > 0 && (num & (num - 1)) == 0

def isPower(num: Int): Boolean =
  if num == 0 then false
  else if num == 1 then true
  else isPower(num / 2)

@main def run(): Unit =
  val num = scala.io.StdIn.readInt()
  val ans = check(num)
  if ans then
    println("True")
  else
    println("False")
