def relation(a: Char, b: Char): Char =
  if a < b then 'A'
  else if a > b then 'D'
  else 'E'

def transform(text: String): String =
  text.sliding(2).map { case s => relation(s(0), s(1)) }.mkString

def squeeze(sig: String): String =
  sig.foldLeft("") { (acc, ch) =>
    if acc.isEmpty || acc.last != ch then acc + ch else acc
  }

def classify(text: String): Char =
  val sig = squeeze(transform(text))
  sig match
    case "A"  => 'A'  // Ascending
    case "D"  => 'B'  // Descending
    case "AD" => 'P'  // Peak
    case "DA" => 'V'  // Valley
    case _    => 'X'  // Others

@main def run() =
  println(classify("abc"))     // A
  println(classify("zyx"))     // B
  println(classify("abzxy"))   // P
  println(classify("zyabc"))   // V
  println(classify("aabbcc"))  // A
  println(classify("abccba"))  // X
  println(classify("aaa"))     // X
