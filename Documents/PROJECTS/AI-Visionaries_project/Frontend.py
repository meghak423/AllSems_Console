import tkinter as tk
from tkinter import messagebox
import requests  # Importing requests library to send HTTP requests
from PIL import Image, ImageTk

# Dummy in-memory user database for simplicity (only for initial test)
users_db = {}

# Function to switch to registration page
def go_to_registration():
    login_frame.pack_forget()  # Hide login page
    registration_frame.pack(fill="both", expand=True)  # Show registration page

# Function to switch to login page
def go_to_login():
    registration_frame.pack_forget()  # Hide registration page
    login_frame.pack(fill="both", expand=True)  # Show login page

# Function to handle user login
def login():
    username = login_username_entry.get()
    password = login_password_entry.get()

    # Check if user exists and the password matches by sending a POST request to the backend
    url = 'http://127.0.0.1:5000/login'
    data = {
        'username': username,
        'password': password
    }

    try:
        response = requests.post(url, json=data)
        if response.status_code == 200:
            messagebox.showinfo("Login Successful", "You have successfully logged in!")
            # Go to the next page (study planner page)
            login_frame.pack_forget()
            input_frame.pack(fill="both", expand=True)
        else:
            messagebox.showerror("Login Failed", response.json()['message'])
    except Exception as e:
        messagebox.showerror("Error", f"Error connecting to server: {e}")

# Function to handle user registration
def register():
    username = registration_username_entry.get()
    password = registration_password_entry.get()
    confirm_password = registration_confirm_password_entry.get()

    # Validate user inputs
    if not username or not password or not confirm_password:
        messagebox.showwarning("Input Error", "Please fill in all fields.")
        return

    if password != confirm_password:
        messagebox.showwarning("Password Mismatch", "Passwords do not match.")
        return

    if username in users_db:
        messagebox.showwarning("User Exists", "Username already exists. Please choose a different one.")
        return

    # Send a POST request to the backend for registration
    url = 'http://127.0.0.1:5000/register'
    data = {
        'username': username,
        'password': password,
        'confirm_password': confirm_password
    }

    try:
        response = requests.post(url, json=data)
        if response.status_code == 200:
            messagebox.showinfo("Registration Successful", "You have successfully registered!")
            # Switch to login page after registration
            go_to_login()
        else:
            messagebox.showwarning("Registration Failed", response.json()['message'])
    except Exception as e:
        messagebox.showerror("Error", f"Error connecting to server: {e}")

# Function to generate a study plan
def generate_study_plan():
    goal = goal_entry.get()
    strengths = strengths_entry.get()
    weaknesses = weaknesses_entry.get()

    if not goal or not strengths or not weaknesses:
        messagebox.showwarning("Input Error", "Please fill in all fields.")
        return

    # Simple static study plan for illustration purposes
    study_plan = f"Study Plan for Goal: {goal}\n\n"
    study_plan += f"Strengths: {strengths}\nWeaknesses: {weaknesses}\n\n"
    study_plan += "Suggested Study Plan:\n"
    study_plan += "1. Focus on the basics.\n2. Work on your strengths.\n3. Address weaknesses progressively."

    # Display the study plan in the output page
    plan_output.delete(1.0, tk.END)
    plan_output.insert(tk.END, study_plan)
    
    # Load and display an image based on the study goal
    display_image(goal)

    # Switch to output page
    input_frame.pack_forget()
    output_frame.pack(fill="both", expand=True)

# Function to display the image based on study goal
def display_image(goal):
    # Define the image path based on the goal
    image_paths = {
        "Improve Coding Skills": "Algo.jpg",  # Replace with your local image paths
        "Reading": "Read.jpg",  # Replace with your local image paths
        "Math": "Math.jpg",  # Replace with your local image paths
    }

    # Check if the goal has an associated image, otherwise use a default image
    image_path = image_paths.get(goal, "Motivation.jpg")  # Replace with a default image path

    try:
        image = Image.open(image_path)
        image = image.resize((300, 200))  # Resize for display
        photo = ImageTk.PhotoImage(image)

        image_label.config(image=photo)
        image_label.image = photo  # Keep a reference to the image to prevent garbage collection
    except Exception as e:
        print(f"Error loading image: {e}")
        messagebox.showwarning("Image Error", "Unable to load image. Displaying default.")
        image = Image.open("Motivation.jpg")
        image = image.resize((300, 200))
        photo = ImageTk.PhotoImage(image)
        image_label.config(image=photo)
        image_label.image = photo  # Keep reference to avoid garbage collection

# Function to go back to the input page
def back_to_input():
    output_frame.pack_forget()
    input_frame.pack(fill="both", expand=True)

# --- Creating the GUI Layout ---
root = tk.Tk()
root.title("Studbud: AI Personalized Study Planner")
root.geometry("500x800")

# --- Login Page ---
login_frame = tk.Frame(root)

# Login labels and entries
login_username_label = tk.Label(login_frame, text="Username:")
login_username_label.pack(pady=5)
login_username_entry = tk.Entry(login_frame, width=50)
login_username_entry.pack(pady=5)

login_password_label = tk.Label(login_frame, text="Password:")
login_password_label.pack(pady=5)
login_password_entry = tk.Entry(login_frame, width=50, show="*")
login_password_entry.pack(pady=5)

login_button = tk.Button(login_frame, text="Login", command=login)
login_button.pack(pady=20)

register_button = tk.Button(login_frame, text="Don't have an account? Register", command=go_to_registration)
register_button.pack(pady=10)

# --- Registration Page ---
registration_frame = tk.Frame(root)

# Registration labels and entries
registration_username_label = tk.Label(registration_frame, text="Choose a Username:")
registration_username_label.pack(pady=5)
registration_username_entry = tk.Entry(registration_frame, width=50)
registration_username_entry.pack(pady=5)

registration_password_label = tk.Label(registration_frame, text="Choose a Password:")
registration_password_label.pack(pady=5)
registration_password_entry = tk.Entry(registration_frame, width=50, show="*")
registration_password_entry.pack(pady=5)

registration_confirm_password_label = tk.Label(registration_frame, text="Confirm Password:")
registration_confirm_password_label.pack(pady=5)
registration_confirm_password_entry = tk.Entry(registration_frame, width=50, show="*")
registration_confirm_password_entry.pack(pady=5)

register_action_button = tk.Button(registration_frame, text="Register", command=register)
register_action_button.pack(pady=20)

back_to_login_button = tk.Button(registration_frame, text="Already have an account? Login", command=go_to_login)
back_to_login_button.pack(pady=10)

# --- Study Planner Page (Input Page) ---
input_frame = tk.Frame(root)

# Labels and Entries for study goal, strengths, and weaknesses
goal_label = tk.Label(input_frame, text="What is your study goal? (e.g., 'Improve Coding Skills')")
goal_label.pack(pady=5)
goal_entry = tk.Entry(input_frame, width=50)
goal_entry.pack(pady=5)

strengths_label = tk.Label(input_frame, text="What are your strengths? (e.g., 'Critical thinking')")
strengths_label.pack(pady=5)
strengths_entry = tk.Entry(input_frame, width=50)
strengths_entry.pack(pady=5)

weaknesses_label = tk.Label(input_frame, text="What are your weaknesses? (e.g., 'Debugging')")
weaknesses_label.pack(pady=5)
weaknesses_entry = tk.Entry(input_frame, width=50)
weaknesses_entry.pack(pady=5)

generate_button = tk.Button(input_frame, text="Generate Study Plan", command=generate_study_plan)
generate_button.pack(pady=20)

# --- Output Page ---
output_frame = tk.Frame(root)

# Text box to display the generated study plan
plan_output = tk.Text(output_frame, height=10, width=50)
plan_output.pack(pady=10)

# Image label for displaying images based on study goal
image_label = tk.Label(output_frame)
image_label.pack(pady=10)

# Back button to return to the input page
back_button = tk.Button(output_frame, text="Back to Input", command=back_to_input)
back_button.pack(pady=10)

# Initially show the login frame
login_frame.pack(fill="both", expand=True)

# Run the GUI
root.mainloop()
