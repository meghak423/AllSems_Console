def multiply(a: Int, b: Int): Int =
  a * b

def roundOff(n: Double): Int =
  var i = 0
  while multiply(5, i) <= n do
    i += 1
  multiply(5, i - 1)

def nearestTo(amt: Double, denom: Double): Int =
  ((0.5 + amt / denom).toInt) * denom.toInt

@main def run(): Unit =
  println(nearestTo(1.5, 10))
