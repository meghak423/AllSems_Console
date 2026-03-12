object StringClassifier {

  def checkAsc(s: String): Boolean = {
    s.sliding(2).forall { case Seq(a, b) => a < b }
  }

  def checkDesc(s: String): Boolean = {
    s.sliding(2).forall { case Seq(a, b) => a > b }
  }

  def findPeak(s: String): Boolean = {
    val peakIndex = s.zipWithIndex.maxBy(_._1)._2
    if (peakIndex == 0 || peakIndex == s.length - 1) return false
    checkAsc(s.substring(0, peakIndex + 1)) &&
    checkDesc(s.substring(peakIndex))
  }

  def findLow(s: String): Boolean = {
    val lowIndex = s.zipWithIndex.minBy(_._1)._2
    if (lowIndex == 0 || lowIndex == s.length - 1) return false
    checkDesc(s.substring(0, lowIndex + 1)) &&
    checkAsc(s.substring(lowIndex))
  }

  def classify(s: String): String = {
    if (checkAsc(s)) "A"
    else if (checkDesc(s)) "B"
    else if (findPeak(s)) "P"
    else if (findLow(s)) "V"
    else "X"
  }

}

object string{
    def main(args: Array[String]): Unit = {
    println(StringClassifier.classify("abca")) 
  }
}
