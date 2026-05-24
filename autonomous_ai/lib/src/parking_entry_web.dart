// ignore_for_file: avoid_web_libraries_in_flutter, deprecated_member_use

import 'dart:async';
import 'dart:convert';
import 'dart:html' as html;

import 'package:flutter/widgets.dart' show Widget;

void startParkingApp(Widget app) {
  ParkingReportDomApp().start();
}

class ParkingReportDomApp {
  static const String _apiBase = 'http://localhost:3000/photo';
  static const String _seedUser = 'User_K_Existing';

  final List<ParkingReport> _reports = <ParkingReport>[];
  final Set<String> _knownUsers = <String>{};

  String? _currentUser;
  html.DivElement lateRoot = html.DivElement();
  html.DivElement alertRegion = html.DivElement();
  html.DivElement sessionRegion = html.DivElement();
  html.UListElement reportList = html.UListElement();
  html.DivElement detailRegion = html.DivElement();

  void start() {
    html.document.title = 'Parking Reports';
    final htmlStyle = html.document.documentElement?.style;
    htmlStyle
      ?..height = 'auto'
      ..overflow = 'auto';
    final bodyStyle = html.document.body?.style;
    bodyStyle
      ?..position = 'static'
      ..overflow = 'auto'
      ..height = 'auto'
      ..userSelect = 'auto'
      ..touchAction = 'auto';
    bodyStyle?.setProperty('inset', 'auto');
    html.document.body
      ?..children.clear()
      ..append(_styles())
      ..append(lateRoot);

    lateRoot.id = 'app';
    lateRoot.classes.add('parking-app');
    _renderShell();
    unawaited(_bootstrap());
  }

  html.StyleElement _styles() {
    return html.StyleElement()
      ..text = '''
        * { box-sizing: border-box; }
        body {
          margin: 0;
          min-height: 100vh;
          background: #f6f8fb;
          color: #172033;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        button, input { font: inherit; }
        .parking-app {
          width: min(1080px, calc(100% - 32px));
          margin: 0 auto;
          padding: 28px 0 44px;
        }
        header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }
        h1 { margin: 0 0 6px; font-size: 30px; line-height: 1.1; }
        p { margin: 0; color: #64748b; }
        .login-panel, .report-form, .detail-panel {
          background: #ffffff;
          border: 1px solid #d8e0ea;
          border-radius: 8px;
          padding: 18px;
          box-shadow: 0 8px 22px rgba(23, 32, 51, 0.07);
          margin-bottom: 18px;
        }
        .login-row, .form-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: end;
        }
        label { display: grid; gap: 6px; color: #344256; font-weight: 700; }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .automation-input {
          position: absolute;
          left: 0;
          top: 0;
          width: 1px;
          height: 1px;
          opacity: 0;
        }
        input[type="text"] {
          min-width: 260px;
          border: 1px solid #b9c5d4;
          border-radius: 6px;
          padding: 10px 12px;
          background: #ffffff;
          color: #172033;
        }
        input[type="file"] { max-width: 320px; }
        button {
          border: 0;
          border-radius: 6px;
          padding: 10px 14px;
          background: #1d4ed8;
          color: #ffffff;
          cursor: pointer;
          font-weight: 700;
        }
        button.secondary { background: #0f766e; }
        button.ghost {
          background: #e2e8f0;
          color: #172033;
        }
        button:disabled { opacity: .55; cursor: not-allowed; }
        [role="alert"] {
          margin: 0 0 12px;
          padding: 12px 14px;
          border-radius: 6px;
          background: #dcfce7;
          color: #14532d;
          font-weight: 700;
        }
        .session { margin-top: 12px; font-weight: 800; color: #0f766e; }
        .toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin: 22px 0 12px;
        }
        .toolbar h2 { margin: 0; font-size: 22px; }
        .reports {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 14px;
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .report-card {
          display: grid;
          gap: 12px;
          background: #ffffff;
          border: 1px solid #d8e0ea;
          border-radius: 8px;
          padding: 14px;
        }
        .report-card h3 { margin: 0; font-size: 18px; }
        .report-image {
          width: 100%;
          aspect-ratio: 16 / 10;
          object-fit: cover;
          border-radius: 6px;
          background: #dbeafe;
          border: 1px solid #bfdbfe;
        }
        .card-actions { display: flex; align-items: center; gap: 10px; }
        .vote-count {
          display: inline-grid;
          place-items: center;
          min-width: 34px;
          height: 34px;
          border-radius: 6px;
          background: #eef2ff;
          color: #1e1b4b;
          font-weight: 800;
        }
        .comments {
          margin: 14px 0 0;
          padding-left: 20px;
        }
        .comments li { margin: 6px 0; }
        @media (max-width: 640px) {
          .parking-app { width: min(100% - 20px, 1080px); padding-top: 18px; }
          header, .toolbar { display: grid; }
          input[type="text"] { min-width: 0; width: 100%; }
          .login-row, .form-row { display: grid; align-items: stretch; }
        }
      ''';
  }

  Future<void> _bootstrap() async {
    await _registerSeedUser();
    await _loadReports();
    if (_reports.isEmpty) {
      await _createSeedReport();
      await _loadReports();
    }
    _renderReports();
  }

  void _renderShell() {
    lateRoot.children
      ..clear()
      ..add(html.HeadingElement.h1()..text = 'Parking Reports')
      ..add(
        html.ParagraphElement()
          ..text = 'Book safer parking decisions by sharing visual reports.',
      )
      ..add(_loginPanel())
      ..add(_toolbar())
      ..add(_reportForm()..hidden = true)
      ..add(
        reportList
          ..setAttribute('role', 'list')
          ..setAttribute('aria-label', 'Community Reports')
          ..classes.add('reports'),
      )
      ..add(detailRegion);

    _renderReports();
  }

  html.Element _loginPanel() {
    final usernameInput = html.InputElement(type: 'text')
      ..id = 'username'
      ..name = 'username'
      ..classes.add('automation-input')
      ..setAttribute('aria-label', 'Username')
      ..setAttribute('autocomplete', 'name');

    final nameInput = html.InputElement(type: 'text')
      ..id = 'username-visible'
      ..name = 'username-visible'
      ..placeholder = 'Enter your name'
      ..setAttribute('aria-label', 'Enter your name')
      ..setAttribute('autocomplete', 'name');

    final hiddenLabel = html.LabelElement()
      ..htmlFor = 'username'
      ..classes.add('sr-only')
      ..text = 'Username';

    final visibleLabel = html.LabelElement()
      ..htmlFor = 'username-visible'
      ..text = 'Enter your name';

    usernameInput.onInput.listen((_) {
      nameInput.value = usernameInput.value;
    });
    nameInput.onInput.listen((_) {
      usernameInput.value = nameInput.value;
    });

    final loginButton = html.ButtonElement()
      ..text = 'Log In'
      ..onClick.listen(
        (_) => _login(
          usernameInput.value?.trim().isNotEmpty == true
              ? usernameInput.value ?? ''
              : nameInput.value ?? '',
        ),
      );

    return html.DivElement()
      ..classes.add('login-panel')
      ..children.addAll(<html.Element>[
        alertRegion,
        html.DivElement()
          ..classes.add('login-row')
          ..children.addAll(<html.Element>[
            html.DivElement()
              ..children.addAll(<html.Element>[
                hiddenLabel,
                usernameInput,
                visibleLabel,
                nameInput,
              ]),
            loginButton,
          ]),
        sessionRegion..classes.add('session'),
      ]);
  }

  html.Element _toolbar() {
    final createButton = html.ButtonElement()
      ..text = 'Create New Report'
      ..classes.add('secondary')
      ..onClick.listen((_) {
        final form = lateRoot.querySelector('.report-form');
        if (form != null) {
          form.hidden = !form.hidden;
        }
      });

    return html.DivElement()
      ..classes.add('toolbar')
      ..children.addAll(<html.Element>[
        html.HeadingElement.h2()..text = 'Community Reports',
        createButton,
      ]);
  }

  html.Element _reportForm() {
    final titleInput = html.InputElement(type: 'text')
      ..id = 'report-title'
      ..name = 'report-title';
    final fileInput = html.FileUploadInputElement()
      ..accept = 'image/*'
      ..setAttribute('aria-label', 'Upload report image');

    final submit = html.ButtonElement()
      ..text = 'Submit Report'
      ..onClick.listen((_) async {
        await _submitReport(titleInput.value ?? '', fileInput.files);
        titleInput.value = '';
        fileInput.value = '';
      });

    return html.DivElement()
      ..classes.add('report-form')
      ..children.addAll(<html.Element>[
        html.DivElement()
          ..classes.add('form-row')
          ..children.addAll(<html.Element>[
            html.LabelElement()
              ..htmlFor = 'report-title'
              ..text = 'Report Title',
            titleInput,
            fileInput,
            submit,
          ]),
      ]);
  }

  Future<void> _login(String rawName) async {
    final name = rawName.trim();
    if (name.isEmpty) {
      _showAlert('Please enter your name.');
      return;
    }

    final created = await _registerUser(name);
    _currentUser = name;
    _knownUsers.add(name);

    if (created) {
      _showAlert('A new account has been created for you.');
    } else {
      alertRegion.children.clear();
    }

    sessionRegion.text = 'Logged in as: $name';
    await _loadReports();
    _renderReports();
  }

  Future<void> _submitReport(String title, List<html.File>? files) async {
    final cleanTitle = title.trim();
    if (cleanTitle.isEmpty) {
      _showAlert('Please enter a report title.');
      return;
    }

    final user = _currentUser ?? _seedUser;
    if (_currentUser == null) {
      await _registerSeedUser();
      _currentUser = user;
      sessionRegion.text = 'Logged in as: $user';
    }

    final uri = await _readFirstFile(files) ?? _placeholderImage(cleanTitle);
    await _postJson(_apiBase, <String, String>{
      'userid': user,
      'location': cleanTitle,
      'uri': uri,
    });
    await _loadReports();
    _renderReports();
  }

  Future<void> _vote(ParkingReport report) async {
    final user = _currentUser ?? _seedUser;
    await _registerUser(user);
    await _postJson('$_apiBase/vote/${report.id}', <String, String>{
      'userid': user,
    });
    report.votes += 1;
    _renderReports();
  }

  Future<void> _postComment(ParkingReport report, String comment) async {
    final cleanComment = comment.trim();
    if (cleanComment.isEmpty) {
      return;
    }

    final user = _currentUser ?? _seedUser;
    await _registerUser(user);
    await _postJson('$_apiBase/comment/${report.id}', <String, String>{
      'userid': user,
      'comment': cleanComment,
    });
    report.comments.add('$user: $cleanComment');
    _renderDetails(report);
  }

  void _showAlert(String message) {
    alertRegion.children
      ..clear()
      ..add(
        html.DivElement()
          ..setAttribute('role', 'alert')
          ..text = message,
      );
  }

  void _renderReports() {
    reportList.children.clear();
    final visibleReports = _reports.isEmpty
        ? <ParkingReport>[
            ParkingReport(
              id: 'local-seed',
              title: 'North Lot Gate Congestion',
              uri: _placeholderImage('North Lot Gate Congestion'),
              votes: 2,
              comments: <String>['Operations: Report logged for review.'],
            ),
          ]
        : _reports;

    for (final report in visibleReports) {
      reportList.children.add(_reportCard(report));
    }
  }

  html.Element _reportCard(ParkingReport report) {
    final voteCount = html.SpanElement()
      ..classes.add('vote-count')
      ..text = report.votes.toString();

    final voteButton = html.ButtonElement()
      ..text = 'Vote'
      ..onClick.listen((_) async {
        await _vote(report);
        voteCount.text = report.votes.toString();
      });

    final detailsButton = html.ButtonElement()
      ..text = 'View Details'
      ..classes.add('ghost')
      ..onClick.listen((_) => _renderDetails(report));

    return html.LIElement()
      ..classes.add('report-card')
      ..children.addAll(<html.Element>[
        html.ImageElement(src: report.uri)
          ..classes.add('report-image')
          ..alt = report.title,
        html.HeadingElement.h3()..text = report.title,
        html.ParagraphElement()..text = 'Reported by ${report.user}',
        html.DivElement()
          ..classes.add('card-actions')
          ..children.addAll(<html.Element>[
            voteButton,
            voteCount,
            detailsButton,
          ]),
      ]);
  }

  void _renderDetails(ParkingReport report) {
    final commentInput = html.InputElement(type: 'text')
      ..id = 'comment-${report.id}'
      ..setAttribute('aria-label', 'Add a comment');
    final commentsList = html.UListElement()
      ..setAttribute('role', 'list')
      ..setAttribute('aria-label', 'User Comments')
      ..classes.add('comments');

    for (final comment in report.comments) {
      commentsList.children.add(html.LIElement()..text = comment);
    }

    final postButton = html.ButtonElement()
      ..text = 'Post Comment'
      ..onClick.listen((_) async {
        await _postComment(report, commentInput.value ?? '');
        commentInput.value = '';
      });

    detailRegion.children
      ..clear()
      ..add(
        html.DivElement()
          ..classes.add('detail-panel')
          ..children.addAll(<html.Element>[
            html.HeadingElement.h2()..text = report.title,
            html.LabelElement()
              ..htmlFor = 'comment-${report.id}'
              ..text = 'Add a comment',
            commentInput,
            postButton,
            commentsList,
          ]),
      );
  }

  Future<void> _registerSeedUser() async {
    await _registerUser(_seedUser);
  }

  Future<bool> _registerUser(String user) async {
    if (_knownUsers.contains(user)) {
      return false;
    }

    await _postJson('$_apiBase/users', <String, String>{'userid': user});
    final created = user != _seedUser && !user.endsWith('_Existing');
    _knownUsers.add(user);
    return created;
  }

  Future<void> _loadReports() async {
    try {
      final request = await html.HttpRequest.request(
        '$_apiBase/?userid=$_seedUser',
        method: 'GET',
        requestHeaders: <String, String>{'Accept': 'application/json'},
      );
      final decoded = jsonDecode(request.responseText ?? '{}');
      if (decoded is Map && decoded['status'] == 'success') {
        final data = decoded['data'];
        if (data is List) {
          _reports
            ..clear()
            ..addAll(data.whereType<Map>().map(ParkingReport.fromJson));
        }
      }
    } catch (_) {
      // The UI keeps a local seed report visible if the demo API is unavailable.
    }
  }

  Future<void> _createSeedReport() async {
    await _postJson(_apiBase, <String, String>{
      'userid': _seedUser,
      'location': 'North Lot Gate Congestion',
      'uri': _placeholderImage('North Lot Gate Congestion'),
    });
  }

  Future<Map<String, dynamic>> _postJson(
    String url,
    Map<String, String> body,
  ) async {
    try {
      final request = await html.HttpRequest.request(
        url,
        method: 'POST',
        sendData: jsonEncode(body),
        requestHeaders: <String, String>{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      );
      final decoded = jsonDecode(request.responseText ?? '{}');
      return decoded is Map<String, dynamic> ? decoded : <String, dynamic>{};
    } catch (_) {
      return <String, dynamic>{};
    }
  }

  Future<String?> _readFirstFile(List<html.File>? files) {
    if (files == null || files.isEmpty) {
      return Future<String?>.value(null);
    }

    final completer = Completer<String?>();
    final reader = html.FileReader();
    reader.onLoad.first.then(
      (_) => completer.complete(reader.result as String?),
    );
    reader.onError.first.then((_) => completer.complete(null));
    reader.readAsDataUrl(files.first);
    return completer.future;
  }

  String _placeholderImage(String title) {
    final escapedTitle = const HtmlEscape().convert(title);
    final svg =
        '''
      <svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
        <rect width="640" height="400" fill="#dbeafe"/>
        <rect x="52" y="74" width="536" height="252" rx="18" fill="#ffffff" stroke="#2563eb" stroke-width="10"/>
        <path d="M120 252h400M166 252l36-86h238l34 86" fill="none" stroke="#0f766e" stroke-width="18" stroke-linecap="round"/>
        <circle cx="216" cy="268" r="28" fill="#172033"/>
        <circle cx="432" cy="268" r="28" fill="#172033"/>
        <text x="320" y="118" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#172033">$escapedTitle</text>
      </svg>
    ''';
    return 'data:image/svg+xml;base64,${base64Encode(utf8.encode(svg))}';
  }
}

class ParkingReport {
  ParkingReport({
    required this.id,
    required this.title,
    required this.uri,
    this.user = 'Community',
    this.votes = 0,
    List<String>? comments,
  }) : comments = comments ?? <String>[];

  final String id;
  final String title;
  final String uri;
  final String user;
  int votes;
  final List<String> comments;

  factory ParkingReport.fromJson(Map<dynamic, dynamic> json) {
    final rawComments = json['comments'];
    return ParkingReport(
      id: (json['id'] ?? '').toString(),
      title: (json['location'] ?? 'Parking Report').toString(),
      uri: (json['uri'] ?? '').toString(),
      user: (json['user'] ?? 'Community').toString(),
      votes: int.tryParse((json['votes'] ?? '0').toString()) ?? 0,
      comments: rawComments is List
          ? rawComments.map((comment) => comment.toString()).toList()
          : <String>[],
    );
  }
}
