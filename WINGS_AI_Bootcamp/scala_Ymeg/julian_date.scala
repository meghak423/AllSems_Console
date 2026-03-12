import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeParseException

@main def toJulianDates(): Unit =
  val examples = List(
    "12 Jan 1990",
    "31, Dec 2005",
    "7, February 2004",
    "14, March, 2016"
  )

  examples.foreach { s =>
    try
      val julian = toJulian(s)
      println(s"'$s' -> $julian")
    catch case e: Exception =>
      println(s"Error parsing '$s': ${e.getMessage}")
  }

def toJulian(dateStr: String): Int =
  val clean = dateStr.replace(",", "")
  val formatter = DateTimeFormatter.ofPattern("d MMM yyyy")
  val date = LocalDate.parse(clean, formatter)
  val year = date.getYear
  val dayOfYear = date.getDayOfYear
  year * 1000 + dayOfYear
