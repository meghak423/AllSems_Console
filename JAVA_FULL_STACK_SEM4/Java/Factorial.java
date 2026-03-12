public class Factorial {

    public static long factorial(int n) {
        long fact = 1; 
        for (int i = 1; i <= n; i++) {
            fact *= i;
        }
        return fact; 
    }

    public static void main(String[] args) {
        int n = 5;
        System.out.println("Factorial of " + n + " is: " + factorial(n));
    }
}
