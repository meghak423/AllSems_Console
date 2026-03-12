from flask import Flask, request, jsonify

app = Flask(__name__)

# Dummy in-memory user database for simplicity
users_db = {}

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    # Validate inputs
    if not username or not password or not confirm_password:
        return jsonify({'message': 'All fields are required!'}), 400

    if password != confirm_password:
        return jsonify({'message': 'Passwords do not match!'}), 400

    if username in users_db:
        return jsonify({'message': 'Username already exists!'}), 400

    # Add new user to the "database"
    users_db[username] = password
    return jsonify({'message': 'Registration successful!'}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Check if the user exists and the password matches
    if username in users_db and users_db[username] == password:
        return jsonify({'message': 'Login successful!'}), 200

    return jsonify({'message': 'Invalid username or password!'}), 400

if __name__ == '__main__':
    # Run the Flask server on port 5000
    app.run(debug=True, host='127.0.0.1', port=5000)
