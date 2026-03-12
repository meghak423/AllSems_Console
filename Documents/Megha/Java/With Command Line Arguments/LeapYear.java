// Class to check if a year is a leap year
class LeapYearChecker {
    // Method to check if a year is a leap year
    public boolean isLeapYear(int year) {
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            return true; // It's a leap year
        }
        return false; // It's not a leap year
    }
}

// Main class
public class LeapYear {
    public static void main(String[] args) {
        // Ensure that a command-line argument is provided
        if (args.length > 0) {
            int year = Integer.parseInt(args[0]);  // Read the year from command-line arguments

            LeapYearChecker checker = new LeapYearChecker();
            if (checker.isLeapYear(year)) {
                System.out.println(year + " is a leap year.");
            } else {
                System.out.println(year + " is not a leap year.");
            }
        } else {
            System.out.println("Please provide a year as a command-line argument.");
        }
    }
}