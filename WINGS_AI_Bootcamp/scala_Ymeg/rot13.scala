def rot13Decoder(s: String): String =
  s.map { char =>
    if char >= 'a' && char <= 'z' then
      ((char - 'a' + 13) % 26 + 'a').toChar
    else if char >= 'A' && char <= 'Z' then
      ((char - 'A' + 13) % 26 + 'A').toChar
    else
      char
  }

@main def run(): Unit =
  val input = scala.io.StdIn.readLine()
  println(rot13Decoder(input))



def rot13Char(ch: Char): Char =
  val alpha = "abcdefghijklmnopqrstuvwxyz"
  val full = alpha + alpha + alpha.toUpperCase + alpha.toUpperCase
  val index = full.indexOf(ch)
  if index == -1 then ch
  else full(index + 13)

def rot13DecoderAlt(s: String): String =
  s.map(rot13Char)

@main def main(): Unit =
  val input = scala.io.StdIn.readLine()
  println(rot13DecoderAlt(input))
