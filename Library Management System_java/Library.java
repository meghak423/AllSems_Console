import java.util.*;

public class Library implements LibraryOperations {
    private Map<String, Book> books = new HashMap<>();

    @Override
    public void addBook(Book book) {
        if (books.containsKey(book.getBookId())) {
            System.out.println("Book already exists!");
        } else {
            books.put(book.getBookId(), book);
            System.out.println("Book added successfully!");
        }
    }

    @Override
    public void viewBooks() {
        if (books.isEmpty()) {
            System.out.println("No books in the library.");
            return;
        }
        books.values().forEach(System.out::println);
    }

    @Override
    public void issueBook(String bookId) {
        Book book = books.get(bookId);
        if (book == null) {
            System.out.println("Book not found!");
        } else if (!book.isAvailable()) {
            System.out.println("Book is already issued.");
        } else {
            book.setAvailable(false);
            System.out.println("Book issued successfully!");
        }
    }

    @Override
    public void returnBook(String bookId) {
        Book book = books.get(bookId);
        if (book == null) {
            System.out.println("Book not found!");
        } else if (book.isAvailable()) {
            System.out.println("Book is already in library.");
        } else {
            book.setAvailable(true);
            System.out.println("Book returned successfully!");
        }
    }

    @Override
    public void removeBook(String bookId) {
        if (books.containsKey(bookId)) {
            books.remove(bookId);
            System.out.println("Book removed successfully.");
        } else {
            System.out.println("Book ID not found.");
        }
    }
}