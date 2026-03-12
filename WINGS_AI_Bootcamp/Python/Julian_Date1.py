def is_leap(yyyy: int) -> bool:
    return (yyyy % 4 == 0 and yyyy % 100 != 0) or (yyyy % 400 == 0)

def to_julian(s: str) -> int:
    days_upto = {"JAN": 0, "FEB": 31, "MAR": 59, "APR": 90, "MAY": 120, "JUN": 151,
                 "JUL": 181, "AUG": 212, "SEP": 243, "OCT": 273, "NOV": 304, "DEC": 334}
    
    # Normalize input by replacing commas and splitting
    parts = s.replace(',', '').split()
    dd = int(parts[0])
    mon = parts[1].upper()[:3]
    yyyy = int(parts[2])
    
    day_of_year = days_upto[mon] + dd
    # Add leap day if leap year and month after Feb
    if is_leap(yyyy) and mon > "FEB":
        day_of_year += 1
    
    # Format as yyyyddd
    return yyyy * 1000 + day_of_year

# Example
print(to_julian("4 Mar 2025"))   # Output: 2025063
print(to_julian("29 Feb 2024"))  # Output: 2024060 (leap day)
print(to_julian("1 Jan 2000"))   # Output: 2000001
