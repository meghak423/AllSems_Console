// Class to calculate Factorial
class Factorial {
    public long calculate(int n) {
        long result = 1;
        for (int i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}

// Main class
public class Fact {
    public static void main(String[] args) {
        Factorial fact = new Factorial();
        System.out.println(fact.calculate(5));  // Output factorial of 5
    }
}

