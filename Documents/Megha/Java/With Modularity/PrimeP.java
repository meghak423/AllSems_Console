// Class to check if a number is prime
class Prime {
    public boolean checkPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i < n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
}

// Main class
public class PrimeP {
    public static void main(String[] args) {
        Prime prime = new Prime();
        for (int i = 1; i <= 10; i++) {
            if (prime.checkPrime(i)) {
                System.out.println(i);  // Output prime numbers from 1 to 10
            }
        }
    }
}