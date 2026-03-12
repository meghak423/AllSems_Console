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
      home: const SlidingGallery(),
    );
  }
}

class SlidingGallery extends StatefulWidget {
  const SlidingGallery({super.key});

  @override
  State<SlidingGallery> createState() => _SlidingGalleryState();
}

class _SlidingGalleryState extends State<SlidingGallery>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _slide;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 6),
    )..repeat(reverse: true);

    _slide = Tween<double>(begin: -100, end: 100).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Widget animatedImage(String path, double delay) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        double offsetX = _slide.value * delay;
        return Transform.translate(
          offset: Offset(offsetX, 0),
          child: Container(
            margin: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              boxShadow: const [
                BoxShadow(
                  color: Colors.black26,
                  blurRadius: 8,
                  offset: Offset(4, 4),
                ),
              ],
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(20),
              child: Image.asset(
                path,
                height: 150,
                width: 150,
                fit: BoxFit.cover,
              ),
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.deepPurple, Colors.indigo],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                "🎉 Sliding Animated Gallery 🎉",
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 40),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  animatedImage("assets/tom1.jpeg", 1),   // moves right
                  animatedImage("assets/tom2.png", -1),  // moves left
                  animatedImage("assets/tom3.jpeg", 0.5), // moves slower
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

