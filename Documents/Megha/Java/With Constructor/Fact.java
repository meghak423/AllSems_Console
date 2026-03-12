// Class to calculate factorial
class FactorialCalculator {
    int number;

    // Constructor to initialize the number
    public FactorialCalculator(int number) {
        this.number = number;
    }

    // Method to calculate factorial
    public long calculateFactorial() {
        long factorial = 1;
        for (int i = 1; i <= number; i++) {
            factorial *= i;
        }
        return factorial;
    }
}

// Main class
public class Fact {
    public static void main(String[] args) {
        FactorialCalculator calculator = new FactorialCalculator(5);  // Pass number to constructor
        System.out.println(calculator.calculateFactorial());  // Output the factorial of 5
    }
}