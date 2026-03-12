// Class to check if a number is prime
class PrimeChecker {
    int number;

    // Constructor to initialize the number
    public PrimeChecker(int number) {
        this.number = number;
    }

    // Method to check if the number is prime
    public boolean isPrime() {
        if (number <= 1) return false;
        for (int i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) return false;
        }
        return true;
    }
}

// Main class
public class Prime {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            PrimeChecker checker = new PrimeChecker(i);  // Pass number to constructor
            if (checker.isPrime()) {
                System.out.println(i);  // Output prime numbers from 1 to 10
            }
        }
    }
}