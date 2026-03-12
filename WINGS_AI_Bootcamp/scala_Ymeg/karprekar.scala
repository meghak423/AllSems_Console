// def toDigits(n: Int): List[Int] =
//     val s = ("0000" + n.toString).takeRight(4)
//     s.toList.map(_.asDigit)

// def toNumber(digits: List[Int]): Int =
//     digits.mkString.toInt

  
// def largestNum(n: Int): Int =
//     toNumber(toDigits(n).sorted.reverse)

// def smallestNum(n: Int): Int =
//     toNumber(toDigits(n).sorted)

// def nextNum(n: Int): Int =
//     largestNum(n) - smallestNum(n)


// def kaprekarSeq(n: Int, seen: List[Int] = Nil): List[Int] =
//     if seen.contains(n) then seen :+ n
//     else kaprekarSeq(nextNum(n), seen :+ n)

// @main def runKaprekar(): Unit =
//     println(kaprekarSeq(356))  
//     println(kaprekarSeq(1000)) 



//Considering  not only 4 digits here
def toDigits(n: Int, size: Int): List[Int] =
  val s = ("0" * size + n.toString).takeRight(size)
  s.toList.map(_.asDigit)

def toNumber(digits: List[Int]): Int =
  digits.mkString.toInt

def largestNum(n: Int, size: Int): Int =
  toNumber(toDigits(n, size).sorted.reverse)

def smallestNum(n: Int, size: Int): Int =
  toNumber(toDigits(n, size).sorted)

def nextNum(n: Int, size: Int): Int =
  largestNum(n, size) - smallestNum(n, size)

def kaprekarSeq(n: Int, seen: List[Int] = Nil): List[Int] =
  val size = n.toString.length
  if seen.contains(n) then seen :+ n
  else kaprekarSeq(nextNum(n, size), seen :+ n)

@main def runKaprekar(): Unit =
  println(kaprekarSeq(356))    
  println(kaprekarSeq(1000))   
  println(kaprekarSeq(21))     
  println(kaprekarSeq(875421)) 
