import java.util.Scanner;

public class MainApp {
    public static void main(String[] args) {
        EmployeeService service = new EmployeeService();
        Scanner sc = new Scanner(System.in);
        int choice;

        do {
            System.out.println("\n=== Employee Management System ===");
            System.out.println("1. Add Employee");
            System.out.println("2. View All Employees");
            System.out.println("3. View Employee by ID");
            System.out.println("4. Update Employee");
            System.out.println("5. Delete Employee");
            System.out.println("6. Exit");
            System.out.print("Enter your choice: ");
            choice = Integer.parseInt(sc.nextLine());

            switch (choice) {
                case 1:
                    System.out.print("Enter ID: ");
                    String id = sc.nextLine();
                    System.out.print("Enter Name: ");
                    String name = sc.nextLine();
                    System.out.print("Enter Department: ");
                    String dept = sc.nextLine();
                    System.out.print("Enter Designation: ");
                    String desg = sc.nextLine();
                    System.out.print("Enter Salary: ");
                    double salary = Double.parseDouble(sc.nextLine());

                    Employee emp = new Employee(id, name, dept, desg, salary);
                    service.addEmployee(emp);
                    break;

                case 2:
                    service.viewAllEmployees();
                    break;

                case 3:
                    System.out.print("Enter Employee ID: ");
                    service.viewEmployeeById(sc.nextLine());
                    break;

                case 4:
                    System.out.print("Enter Employee ID to Update: ");
                    service.updateEmployee(sc.nextLine(), sc);
                    break;

                case 5:
                    System.out.print("Enter Employee ID to Delete: ");
                    service.deleteEmployee(sc.nextLine());
                    break;

                case 6:
                    System.out.println("Exiting system...");
                    break;

                default:
                    System.out.println("Invalid choice!");
            }

        } while (choice != 6);

        sc.close();
    }
}
