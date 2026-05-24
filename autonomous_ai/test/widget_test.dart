import 'package:autonomous_ai/main.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('fallback app renders the parking reports shell', (tester) async {
    await tester.pumpWidget(const MyApp());

    expect(
      find.text('Parking Reports is available in the web build.'),
      findsOneWidget,
    );
  });
}
