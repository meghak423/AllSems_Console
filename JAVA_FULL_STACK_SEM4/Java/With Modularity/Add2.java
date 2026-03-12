// Class to add two numbers
class Adder {
    public int add(int a, int b) {
        return a + b;
    }
}

// Main class
public class Add2 {
    public static void main(String[] args) {
        Adder adder = new Adder();
        System.out.println(adder.add(5, 7));  // Output the sum of 5 and 7
    }
}