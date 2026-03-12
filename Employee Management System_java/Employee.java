public class Employee {
    private String id;
    private String name;
    private String department;
    private String designation;
    private double salary;

    public Employee(String id, String name, String department, String designation, double salary) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.designation = designation;
        this.salary = salary;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setName(String name) { this.name = name; }
    public void setDepartment(String department) { this.department = department; }
    public void setDesignation(String designation) { this.designation = designation; }
    public void setSalary(double salary) { this.salary = salary; }

    @Override
    public String toString() {
        return String.format("ID: %s | Name: %s | Dept: %s | Role: %s | Salary: %.2f",
                id, name, department, designation, salary);
    }
}
