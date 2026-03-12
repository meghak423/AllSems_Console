
// Simple Interest Program in Java using Methods
import java.util.Scanner;

public class Si {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);

        System.out.println("Enter the principal (amount), time, and rate:\n");

        float p = in.nextFloat();
        float t = in.nextFloat();
        float r = in.nextFloat();

        CalculateSimpleInterest(p, t, r);
    }

    public static void CalculateSimpleInterest(float x, float y, float z) {
        float SI;

        SI = (x * y * z) / 100;

        System.out.println("\nSimple Interest = " + SI);
    }
}