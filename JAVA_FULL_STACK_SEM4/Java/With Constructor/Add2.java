// Class to add two numbers
class Adder {
    int num1, num2;

    // Constructor to initialize the numbers
    public Adder(int num1, int num2) {
        this.num1 = num1;
        this.num2 = num2;
    }

    // Method to add the numbers
    public int add() {
        return num1 + num2;
    }
}

// Main class
public class Add2 {
    public static void main(String[] args) {
        Adder adder = new Adder(5, 7);  // Pass numbers to the constructor
        System.out.println(adder.add());  // Output the sum of 5 and 7
    }
}
