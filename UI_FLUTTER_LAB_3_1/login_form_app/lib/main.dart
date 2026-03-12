import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: const RegistrationForm(),
    );
  }
}

class RegistrationForm extends StatefulWidget {
  const RegistrationForm({super.key});

  @override
  State<RegistrationForm> createState() => _RegistrationFormState();
}

class _RegistrationFormState extends State<RegistrationForm> {
  final _formKey = GlobalKey<FormState>();

  final nameController = TextEditingController();
  final rollController = TextEditingController();
  final emailController = TextEditingController();
  final phoneController = TextEditingController();
  final remarksController = TextEditingController();

  void _submitForm() {
    if (_formKey.currentState!.validate()) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Form Submitted Successfully!")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200], // Google Form-like background
      body: Center(
        child: SingleChildScrollView(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 600),
            child: Card(
              elevation: 3,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // 🔹 Banner Image
                  ClipRRect(
                    borderRadius: const BorderRadius.only(
                      topLeft: Radius.circular(12),
                      topRight: Radius.circular(12),
                    ),
                    child: Image.asset(
                      "assets/2.jpeg", // 👈 make sure this file exists
                      height: 180,
                      fit: BoxFit.cover,
                    ),
                  ),

                  // 🔹 Form Content
                  Padding(
                    padding: const EdgeInsets.all(20),
                    child: Form(
                      key: _formKey,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          const Text(
                            "Google Form",
                            style: TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 24),

                          // Full Name
                          TextFormField(
                            controller: nameController,
                            decoration: const InputDecoration(
                              labelText: "Full Name",
                              border: UnderlineInputBorder(),
                            ),
                            validator: (value) =>
                                value!.isEmpty ? "Enter your name" : null,
                          ),
                          const SizedBox(height: 20),

                          // Roll Number
                          TextFormField(
                            controller: rollController,
                            decoration: const InputDecoration(
                              labelText: "Roll Number",
                              border: UnderlineInputBorder(),
                            ),
                            validator: (value) =>
                                value!.isEmpty ? "Enter your roll number" : null,
                          ),
                          const SizedBox(height: 20),

                          // Email
                          TextFormField(
                            controller: emailController,
                            decoration: const InputDecoration(
                              labelText: "Email Address",
                              border: UnderlineInputBorder(),
                            ),
                            keyboardType: TextInputType.emailAddress,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return "Enter your email";
                              }
                              if (!RegExp(r'^[^@]+@[^@]+\.[^@]+')
                                  .hasMatch(value)) {
                                return "Enter valid email";
                              }
                              return null;
                            },
                          ),
                          const SizedBox(height: 20),

                          // Phone Number
                          TextFormField(
                            controller: phoneController,
                            decoration: const InputDecoration(
                              labelText: "Mobile Number",
                              border: UnderlineInputBorder(),
                            ),
                            keyboardType: TextInputType.phone,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return "Enter your mobile number";
                              }
                              if (!RegExp(r'^[0-9]{10}$').hasMatch(value)) {
                                return "Enter valid 10-digit number";
                              }
                              return null;
                            },
                          ),
                          const SizedBox(height: 20),

                          // Remarks
                          TextFormField(
                            controller: remarksController,
                            decoration: const InputDecoration(
                              labelText: "Remarks (Optional)",
                              border: UnderlineInputBorder(),
                            ),
                            maxLines: 3,
                          ),
                          const SizedBox(height: 30),

                          // Submit Button
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.deepPurple,
                              padding:
                                  const EdgeInsets.symmetric(vertical: 16),
                            ),
                            onPressed: _submitForm,
                            child: const Text(
                              "Submit",
                              style: TextStyle(
                                  fontSize: 18, color: Colors.white),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}






