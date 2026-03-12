object FairRations:

  def fairRations(loaves: Array[Int]): String =
    var loavesGiven = 0
    val arr = loaves.clone() // To avoid mutating the input array

    for i <- 0 until arr.length - 1 do
      if arr(i) % 2 != 0 then
        arr(i) += 1
        arr(i + 1) += 1
        loavesGiven += 2

    if arr.last % 2 == 0 then loavesGiven.toString else "NO"

@main def runFairRations(): Unit =
  val test = Array(4, 5, 7, 8)
  println(FairRations.fairRations(test)) // Output: 4
