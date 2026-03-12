// Class to check prime numbers
class PrimeChecker {
    // Method to check if a number is prime
    public boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
}

// Main class
public class Prime {
    public static void main(String[] args) {
        // Ensure that command-line arguments are provided
        if (args.length > 0) {
            int start = Integer.parseInt(args[0]);  // Start number for the range
            int end = Integer.parseInt(args[1]);    // End number for the range
            
            PrimeChecker checker = new PrimeChecker();
            
            // Print prime numbers in the range [start, end]
            for (int i = start; i <= end; i++) {
                if (checker.isPrime(i)) {
                    System.out.println(i);
                }
            }
        } else {
            System.out.println("Please provide the start and end numbers as command-line arguments.");
        }
    }
}