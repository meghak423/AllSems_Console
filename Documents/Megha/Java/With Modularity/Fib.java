
class Fibonacci {
    public long calculate(int n) {
        long a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            long temp = a + b;
            a = b;
            b = temp;
        }
        return (n == 0) ? a : b;
    }
}

public class Fib {
    public static void main(String[] args) {
        Fibonacci fib = new Fibonacci();
        System.out.println(fib.calculate(7));  
    }
}
