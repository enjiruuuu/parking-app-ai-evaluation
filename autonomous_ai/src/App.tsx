import { Component, createSignal, createEffect, onMount } from 'solid-js';

interface Photo {
  user: string;
  id: string;
  votes: number;
  location: string;
  uri: string;
  comments: string[];
}

const API_BASE = 'http://localhost:3000/photo';

const App: Component = () => {
  const [username, setUsername] = createSignal('');
  const [currentUser, setCurrentUser] = createSignal<string | null>(null);
  const [showAlert, setShowAlert] = createSignal(false);
  const [alertMessage, setAlertMessage] = createSignal('');
  const [photos, setPhotos] = createSignal<Photo[]>([]);
  const [showCreateForm, setShowCreateForm] = createSignal(false);
  const [reportTitle, setReportTitle] = createSignal('');
  const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
  const [selectedPhoto, setSelectedPhoto] = createSignal<Photo | null>(null);
  const [newComment, setNewComment] = createSignal('');

  const registerOrLogin = async () => {
    const name = username();
    if (!name) return;

    try {
      const response = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: name })
      });
      const data = await response.json();

      if (data.status === 'success') {
        setAlertMessage('A new account has been created for you.');
        setShowAlert(true);
      } else {
        setAlertMessage('Welcome back!');
        setShowAlert(true);
      }

      setCurrentUser(name);
      await loadPhotos();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const loadPhotos = async () => {
    const user = currentUser();
    if (!user) return;

    try {
      const response = await fetch(`${API_BASE}?userid=${user}`);
      const data = await response.json();
      if (data.status === 'success') {
        setPhotos(data.data);
      }
    } catch (error) {
      console.error('Load photos error:', error);
    }
  };

  const createReport = async () => {
    const user = currentUser();
    const title = reportTitle();
    const file = selectedFile();

    if (!user || !title || !file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;

      try {
        const response = await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userid: user,
            location: title,
            uri: base64
          })
        });
        const data = await response.json();
        if (data.status === 'success') {
          setReportTitle('');
          setSelectedFile(null);
          setShowCreateForm(false);
          await loadPhotos();
        }
      } catch (error) {
        console.error('Create report error:', error);
      }
    };
    reader.readAsDataURL(file);
  };

  const voteOnPhoto = async (photoId: string) => {
    const user = currentUser();
    if (!user) return;

    try {
      const response = await fetch(`${API_BASE}/vote/${photoId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: user })
      });
      const data = await response.json();
      if (data.status === 'success') {
        await loadPhotos();
      }
    } catch (error) {
      console.error('Vote error:', error);
    }
  };

  const addComment = async (photoId: string) => {
    const user = currentUser();
    const comment = newComment();

    if (!user || !comment) return;

    try {
      const response = await fetch(`${API_BASE}/comment/${photoId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userid: user,
          comment: comment
        })
      });
      const data = await response.json();
      if (data.status === 'success') {
        setNewComment('');
        await loadPhotos();
        const updated = photos().find(p => p.id === photoId);
        if (updated) setSelectedPhoto(updated);
      }
    } catch (error) {
      console.error('Comment error:', error);
    }
  };

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      setSelectedFile(target.files[0]);
    }
  };

  return (
    <div class="app">
      <h1>Autonomous AI Parking App</h1>

      {!currentUser() ? (
        <div class="login-section">
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            value={username()}
            onInput={(e) => setUsername(e.currentTarget.value)}
            placeholder="Enter your name"
            aria-label="Enter your name"
            data-testid="username-input"
          />
          <button onClick={registerOrLogin} data-testid="login-button">Log In</button>
        </div>
      ) : (
        <div class="dashboard">
          {showAlert() && (
            <div role="alert" data-testid="alert-message">{alertMessage()}</div>
          )}
          <p>Logged in as: {currentUser()}</p>

          <button onClick={() => setShowCreateForm(!showCreateForm())} data-testid="create-report-button">
            {showCreateForm() ? 'Cancel' : 'Create New Report'}
          </button>

          {showCreateForm() && (
            <div class="create-report-form">
              <label for="report-title">Report Title</label>
              <input
                id="report-title"
                type="text"
                value={reportTitle()}
                onInput={(e) => setReportTitle(e.currentTarget.value)}
                placeholder="Enter report title"
                data-testid="report-title-input"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                data-testid="file-input"
              />
              <button onClick={createReport} data-testid="submit-report-button">Submit Report</button>
            </div>
          )}

          <div role="list" aria-label="Community Reports" class="reports-list" data-testid="reports-list">
            {photos().map((photo) => (
              <div class="report-card" data-testid="report-card">
                <h3>{photo.location}</h3>
                {photo.uri && <img src={photo.uri} alt={photo.location} style="max-width: 200px;" />}
                <div class="vote-section">
                  <span class="vote-count">{photo.votes}</span>
                  <button onClick={() => voteOnPhoto(photo.id)} data-testid="vote-button">Vote</button>
                </div>
                <button onClick={() => setSelectedPhoto(photo)} data-testid="view-details-button">View Details</button>
              </div>
            ))}
          </div>

          {selectedPhoto() && (
            <div class="photo-details">
              <h2>{selectedPhoto()!.location}</h2>
              {selectedPhoto()!.uri && <img src={selectedPhoto()!.uri} alt={selectedPhoto()!.location} style="max-width: 400px;" />}
              <h3>Comments</h3>
              <div role="list" aria-label="User Comments" class="comments-list" data-testid="comments-list">
                {selectedPhoto()!.comments.map((comment) => (
                  <div class="comment">{comment}</div>
                ))}
              </div>
              <div class="add-comment">
                <label for="comment-input">Add a comment</label>
                <input
                  id="comment-input"
                  type="text"
                  value={newComment()}
                  onInput={(e) => setNewComment(e.currentTarget.value)}
                  data-testid="comment-input"
                />
                <button onClick={() => addComment(selectedPhoto()!.id)} data-testid="post-comment-button">Post Comment</button>
              </div>
              <button onClick={() => setSelectedPhoto(null)} data-testid="close-button">Close</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
