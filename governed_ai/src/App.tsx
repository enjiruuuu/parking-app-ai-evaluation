import { Component, Show } from 'solid-js';
import { currentUser, alertMessage } from './stores/userStore';
import { showCreateModal, selectedReport, setShowCreateModal } from './stores/reportStore';
import LoginForm from './components/LoginForm';
import ReportList from './components/ReportList';
import CreateReportModal from './components/CreateReportModal';
import CommentSection from './components/CommentSection';

const App: Component = () => {
  return (
    <div class="app">
      <h1>Parking Lot Reporting</h1>
      
      <Show when={!currentUser()}>
        <LoginForm />
      </Show>
      
      <Show when={currentUser()}>
        <div class="user-info">
          <p>Logged in as: {currentUser()}</p>
        </div>
        
        <div class="actions">
          <button 
            data-testid="create-report-button"
            onClick={() => setShowCreateModal(true)}
          >
            Create Report
          </button>
        </div>
        
        <ReportList />
      </Show>
      
      <Show when={alertMessage()}>
        <div data-testid="alert-message">{alertMessage()}</div>
      </Show>
      
      <CreateReportModal />
      <CommentSection />
    </div>
  );
};

export default App;
