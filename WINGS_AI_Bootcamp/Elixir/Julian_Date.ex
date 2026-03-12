defmodule JulianDate do
  def is_leap(year) do
    (rem(year, 4) == 0 and rem(year, 100) != 0) or rem(year, 400) == 0
  end

  def to_julian(date_str) do
    days_upto = %{
      "JAN" => 0, "FEB" => 31, "MAR" => 59, "APR" => 90,
      "MAY" => 120, "JUN" => 151, "JUL" => 181, "AUG" => 212,
      "SEP" => 243, "OCT" => 273, "NOV" => 304, "DEC" => 334
    }

    # Clean string and split parts
    cleaned = String.replace(date_str, ",", "")
    [dd_str, mon_str, yyyy_str] = String.split(cleaned)
    dd = String.to_integer(dd_str)
    mon = String.slice(String.upcase(mon_str), 0..2)
    yyyy = String.to_integer(yyyy_str)

    day_of_year = Map.fetch!(days_upto, mon) + dd
    day_of_year =
      if is_leap(yyyy) and mon > "FEB" do
        day_of_year + 1
      else
        day_of_year
      end

    yyyy * 1000 + day_of_year
  end
end

IO.puts JulianDate.to_julian("4 Mar 2025")    # 2025063
IO.puts JulianDate.to_julian("29 Feb 2024")   # 2024060
IO.puts JulianDate.to_julian("1 Jan 2000")    # 2000001

