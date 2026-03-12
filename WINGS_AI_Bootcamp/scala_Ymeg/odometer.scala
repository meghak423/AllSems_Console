def isValid(n: Int): Boolean =
  if n < 10 then true
  else if (n / 10) % 10 < n % 10 then isValid(n / 10)
  else false

def getLimits(n: Int): (Int, Int) =
  val LIMIT = "123456789"
  val size = n.toString.length
  (LIMIT.take(size).toInt, LIMIT.takeRight(size).toInt)

def nextReading(reading: Int): Int =
  val (start, limit) = getLimits(reading)
  if reading == limit then start
  else
    var r = reading + 1
    while !isValid(r) do r += 1
    r

def nextReadingK(reading: Int, step: Int = 1): Int =
  var r = reading
  for _ <- 1 to step do
    r = nextReading(r)
  r

def prevReading(reading: Int, step: Int = 1): Int =
  val (start, limit) = getLimits(reading)
  if reading == start then limit
  else
    var r = reading - 1
    while !isValid(r) do r -= 1
    r

def distance(a: Int, b: Int): Int =
  if a.toString.length != b.toString.length then -1
  else
    var count = 0
    var r = a
    while r != b do
      r = nextReading(r)
      count += 1
    count
