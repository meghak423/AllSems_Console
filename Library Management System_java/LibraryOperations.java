public interface LibraryOperations {
    void addBook(Book book);
    void viewBooks();
    void issueBook(String bookId);
    void returnBook(String bookId);
    void removeBook(String bookId);  // Delete Operation
}