// Class to add two numbers
class Adder {
    // Method to add two numbers
    public int add(int a, int b) {
        return a + b;
    }
}

// Main class
public class Add2 {
    public static void main(String[] args) {
        // Ensure that two command-line arguments are provided
        if (args.length == 2) {
            int num1 = Integer.parseInt(args[0]);  // First number
            int num2 = Integer.parseInt(args[1]);  // Second number

            Adder adder = new Adder();
            int result = adder.add(num1, num2);  // Add the two numbers
            System.out.println("Sum: " + result);  // Output the result
        } else {
            System.out.println("Please provide two numbers as command-line arguments.");
        }
    }
}