
// object LoafDistributor {
//   def fairRations(loaves: Array[Int]): String = {
//     var given = 0
//     for (i <- 0 until loaves.length - 1) {
//       if (loaves(i) % 2 != 0) {
//         loaves(i) += 1
//         loaves(i + 1) += 1
//         given += 2
//       }
//     }
//     if (loaves.last % 2 == 0) given.toString
//     else "NO"
//   }
// }

// object loaf {
//   def main(args: Array[String]): Unit = {
//     val loaves = Array(2, 3, 4, 5, 6)  
//     println(LoafDistributor.fairRations(loaves))
//   }
// }







def fairRations(loaves: Array[Int]): String =
  var given = 0
  for i <- 0 until loaves.length - 1 do
    if loaves(i) % 2 != 0 then
      loaves(i) += 1
      loaves(i + 1) += 1
      given = given + 2

  if loaves.last % 2 == 0 then given.toString else "NO"

@main def runLoafDistributor(): Unit =
  val loaves = Array(2, 3, 4, 5, 6)
  println(fairRations(loaves))

