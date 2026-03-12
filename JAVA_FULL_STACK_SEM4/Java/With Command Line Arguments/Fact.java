// Class to calculate factorial
class FactorialCalculator {
    int n=5;

    // Constructor to initialize the value of n
    public FactorialCalculator(int n) {
        this.n = n;
    }

    // Method to calculate the factorial
    public long calculateFactorial() {
        long factorial = 1;
        for (int i = 1; i <= n; i++) {
            factorial *= i;
        }
        return factorial;
    }
}

// Main class
public class Fact {
    public static void main(String[] args) {
        // Ensure that a command-line argument is provided
        if (args.length > 0) {
            int n = Integer.parseInt(args[0]);  // Read the value of n from command-line arguments
            FactorialCalculator calculator = new FactorialCalculator(n);
            System.out.println(calculator.calculateFactorial());  // Output the factorial of n
        } else {
            System.out.println("Please provide the value of n.");
        }
    }
}