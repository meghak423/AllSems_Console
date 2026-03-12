

public class Fib {
    
   
    public static void Fibo(int n) {

        int  a=0, b=1;
        System.out.print("Fibonacci Series: \n ");

        for ( int i = 1; i <= n; i++ ){
            System.out.print(a + " ");
            int c;
            c = a + b;
            a = b;
            b = c;
        }
    
    }
public static void main(String[] args){
    int n=10;
    Fibo(n);
}
}