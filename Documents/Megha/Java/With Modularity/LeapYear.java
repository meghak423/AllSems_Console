
class LeapYearChecker {
    public boolean isLeapYear(int year) {
        if (year % 4 == 0) {
            if (year % 100 == 0) {
                return year % 400 == 0;
            }
            return true;
        }
        return false;
    }
}

public class LeapYear {
    public static void main(String[] args) {
        LeapYearChecker checker = new LeapYearChecker();
        System.out.println(checker.isLeapYear(2024));  // Output true if 2024 is a leap year
    }
}