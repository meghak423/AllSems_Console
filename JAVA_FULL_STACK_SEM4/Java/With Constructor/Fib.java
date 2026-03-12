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
        FibonacciCalculator calculator = new FibonacciCalculator(7);  // Pass n to constructor
        System.out.println(calculator.calculateFibonacci());  // Output the 7th Fibonacci number
    }
}