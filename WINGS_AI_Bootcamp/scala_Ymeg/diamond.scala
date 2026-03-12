//Approach
// @main def printPyramid(): Unit =
//   val n = 5

//   for i <- 1 to n do
//     val spaces = " " * (n - i)
//     val stars = "*" * (2 * i - 1)
//     println(spaces + stars)



//Approach
// def buildPyramid(n: Int): String =
//   (1 to n)
//     .map(i => " " * (n - i) + "*" * (2 * i - 1))
//     .mkString("\n")

// @main def run(): Unit =
//   val n = 
//   println(buildPyramid(n))



// object PatternPrinter:

//   val STAR   = "*"
//   val REPEAT = "**"
//   val STOP   = ""
//   val LF     = "\n"
//   val WIDTH  = 120

//   // Generate a pattern using higher-order function (map)
//   def pattern(size: Int): List[String] =
//     (0 until size).toList.map(line)

//   // Construct a single line
//   def line(k: Int): String =
//     start(STAR, k) + repeat(REPEAT, k) + stop(STOP, k)

//   def start(atom: String, k: Int): String = atom

//   def repeat(atom: String, k: Int): String = atom * k

//   def stop(atom: String, k: Int): String = atom

//   // Center align the line in WIDTH characters
//   def center(line: String, width: Int): String =
//     val padding = (width - line.length) / 2
//     " " * padding + line + " " * padding

//   def makePyramid(size: Int): String =
//     pattern(size).map(center(_, WIDTH)).mkString(LF)

//   def makeDiamond(size: Int): String =
//     val half = if size % 2 == 0 then size / 2 else (size + 1) / 2
//     val top    = pattern(half)
//     val bottom = pattern(size - half).reverse
//     (top ++ bottom).map(center(_, WIDTH)).mkString(LF)

//   @main def run(): Unit =
//     println(makePyramid(8))
//     println(makeDiamond(6))








val STAR = "*"
val REPEAT = "**"
val STOP = ""
val LF = "\n"
val WIDTH = 120

def pattern(size: Int): List[String] =
	(0 until size).toList.map(line)

def line(k: Int): String = 
	start(STAR, k) + repeat(REPEAT, k) + stop(STOP, k)

def start(atom: String, k: Int): String = 
	atom

def repeat(atom: String, k: Int): String =
  	atom * k 

def stop(atom: String, k: Int): String = 
  	atom

def center(line: String, width: Int): String =
    val padding = (width - line.length) / 2
    " " * padding + line + " " * padding


def make_pyramid(size: Int): String =
  	pattern(size).map(center(_, WIDTH)).mkString(LF)

def make_diamond(size: Int): String = 
	val half = if size % 2 == 0 then size / 2 else (size + 1) / 2
	val top    = pattern(half)
	val bottom = pattern(size - half).reverse
	(top ++ bottom).map(center(_, WIDTH)).mkString(LF)



@main def run(): Unit =
	println(make_pyramid(8))
	println(make_diamond(6))
