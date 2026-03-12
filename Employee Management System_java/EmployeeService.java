import java.util.*;

public class EmployeeService {
    private Map<String, Employee> employeeMap = new HashMap<>();

    // CREATE
    public void addEmployee(Employee emp) {
        if (employeeMap.containsKey(emp.getId())) {
            System.out.println("Employee with ID already exists!");
        } else {
            employeeMap.put(emp.getId(), emp);
            System.out.println("Employee added successfully.");
        }
    }

    // READ
    public void viewAllEmployees() {
        if (employeeMap.isEmpty()) {
            System.out.println("No employees found.");
        } else {
            employeeMap.values().forEach(System.out::println);
        }
    }

    public void viewEmployeeById(String id) {
        Employee emp = employeeMap.get(id);
        if (emp == null) {
            System.out.println("Employee not found.");
        } else {
            System.out.println(emp);
        }
    }

    // UPDATE
    public void updateEmployee(String id, Scanner sc) {
        Employee emp = employeeMap.get(id);
        if (emp == null) {
            System.out.println("Employee not found.");
            return;
        }
        System.out.print("Enter new name: ");
        emp.setName(sc.nextLine());
        System.out.print("Enter new department: ");
        emp.setDepartment(sc.nextLine());
        System.out.print("Enter new designation: ");
        emp.setDesignation(sc.nextLine());
        System.out.print("Enter new salary: ");
        emp.setSalary(Double.parseDouble(sc.nextLine()));
        System.out.println("Employee updated successfully.");
    }

    // DELETE
    public void deleteEmployee(String id) {
        if (employeeMap.remove(id) != null) {
            System.out.println("Employee removed successfully.");
        } else {
            System.out.println("Employee ID not found.");
        }
    }
}