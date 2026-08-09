import { Component, createSignal } from 'solid-js';
import { registerUser } from '../services/api';
import { currentUser, setCurrentUser, alertMessage, setAlertMessage } from '../stores/userStore';
import { getPhotos } from '../services/api';
import { reports, setReports } from '../stores/reportStore';

const LoginForm: Component = () => {
  const [username, setUsername] = createSignal('');

  const handleLogin = async () => {
    const name = username().trim();
    if (!name) return;

    const result = await registerUser(name);
    
    if (result.status === 'error' && result.message === 'User already registered') {
      setAlertMessage('Welcome back!');
    } else if (result.status === 'success') {
      setAlertMessage('A new account has been created for you.');
    } else {
      setAlertMessage(result.message || 'An error occurred');
    }

    setCurrentUser(name);
    
    // Load reports after login
    const photosResult = await getPhotos(name);
    if (photosResult.status === 'success' && photosResult.data) {
      setReports(photosResult.data);
    } else {
      setReports([]);
    }
  };

  return (
    <div class="login-form">
      <input
        data-testid="username-input"
        type="text"
        placeholder="Enter your name"
        value={username()}
        onInput={(e) => setUsername(e.currentTarget.value)}
      />
      <button data-testid="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginForm;
