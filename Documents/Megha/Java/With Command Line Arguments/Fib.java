// Class to calculate Fibonacci
class FibonacciCalculator {
    int n;

    // Constructor to initialize the value of n
    public FibonacciCalculator(int n) {
        this.n = n;
    }

    // Method to calculate the nth Fibonacci number
    public int calculateFibonacci() {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    }
}

// Main class
public class Fib {
    public static void main(String[] args) {
        // Ensure that a command-line argument is provided
        if (args.length > 0) {
            int n = Integer.parseInt(args[0]);  // Read the value of n from command-line arguments
            FibonacciCalculator calculator = new FibonacciCalculator(n);
            System.out.println(calculator.calculateFibonacci());  // Output the nth Fibonacci number
        } else {
            System.out.println("Please provide the value of n.");
        }
    }
}