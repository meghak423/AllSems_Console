// Class to check if a year is a leap year
class LeapYearChecker {
    int year;

    // Constructor to set the year
    public LeapYearChecker(int year) {
        this.year = year;
    }

    // Method to determine if it's a leap year
    public boolean isLeapYear() {
        return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
    }
}

// Main class
public class LeapYear {
    public static void main(String[] args) {
        LeapYearChecker checker = new LeapYearChecker(2024);  // Initialize with year 2024
        System.out.println(checker.isLeapYear());  // Output: true or false
    }
}