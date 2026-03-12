# Given string like 12 jan 1990 or 7, february 2004 or 14, March, 2012   convert this string into julian format that is a 7 digit integer.
# in form yyyyddd

from datetime import datetime

def convert_to_julian(date_str: str) -> int:
    clean_date = date_str.replace(',', '').strip()

    try:
        date_obj = datetime.strptime(clean_date, "%d %b %Y")
    except ValueError:
        try:
            date_obj = datetime.strptime(clean_date, "%d %B %Y")
        except ValueError:
            return -1

    year = date_obj.year
    day_of_year = date_obj.timetuple().tm_yday

    #return f"{year}{day_of_year:03d}"
    return year * 1000 + day_of_year

'''
date_input = input()
julian_date = convert_to_julian(date_input)
print("Julian date format", julian_date)
'''

print(convert_to_julian("4 Mar 2025"))
print(convert_to_julian("1, January 2025"))
print(convert_to_julian("2, Feb, 2025"))

print("  ")

# Using parser directly from datetime

from dateutil import parser
from datetime import datetime

def toJulian(date_str: str) -> int:
    try:
        date_obj = parser.parse(date_str, dayfirst=True)
    except (ValueError, OverflowError):
        return -1

    year = date_obj.year
    day_of_year = date_obj.timetuple().tm_yday

    return year * 1000 + day_of_year

print(toJulian("4 Mar 2025"))
print(toJulian("1, January 2025"))
print(toJulian("2, Feb, 2025"))

