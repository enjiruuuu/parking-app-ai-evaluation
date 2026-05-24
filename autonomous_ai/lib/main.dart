import 'package:flutter/material.dart';

import 'src/parking_entry_stub.dart'
    if (dart.library.html) 'src/parking_entry_web.dart';

void main() {
  startParkingApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Parking Reports',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xff2563eb)),
        useMaterial3: true,
      ),
      home: const _FallbackHome(),
    );
  }
}

class _FallbackHome extends StatelessWidget {
  const _FallbackHome();

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Text('Parking Reports is available in the web build.'),
      ),
    );
  }
}
