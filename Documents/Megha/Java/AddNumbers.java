import java.util.Scanner;

public class AddNumbers {

    // Method to add two numbers
    public static int add(int num1, int num2) {
        return num1 + num2; // Returns the sum
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter first number: ");
        int number1 = scanner.nextInt();
        System.out.print("Enter second number: ");
        int number2 = scanner.nextInt();

        int sum = add(number1, number2);
        System.out.println("The sum is: " + sum);

        scanner.close();
    }
}
