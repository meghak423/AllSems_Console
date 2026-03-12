// Java Program to implement
// FizzBuzz Problem

public class FizzBuzz {
    public static void main(String[] args)
    {
        fizzBuzz(9);
        fizzBuzz(25);
        fizzBuzz(15);
        fizzBuzz(4);
    }

    public static void fizzBuzz(int n)
    {

        // check if divisible by both 3 and 5.
        if (n % 3 == 0 && n % 5 == 0) {
            System.out.println("FizzBuzz");
        }

        // check if divisible by both 3.
        else if (n % 3 == 0) {
            System.out.println("Fizz");
        }

        // check if divisible by both 5.
        else if (n % 5 == 0) {
            System.out.println("Buzz");
        }

        // If not divisible by anything print the number as
        // it is.
        else {
            System.out.println(n);
        }
    }
}
