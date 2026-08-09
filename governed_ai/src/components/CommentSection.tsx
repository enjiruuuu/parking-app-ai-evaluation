import { Component, createSignal, For, Show } from 'solid-js';
import { commentPhoto } from '../services/api';
import { currentUser } from '../stores/userStore';
import { selectedReport, setSelectedReport, reports, setReports } from '../stores/reportStore';

const CommentSection: Component = () => {
  const [comment, setComment] = createSignal('');

  const handlePostComment = async () => {
    const user = currentUser();
    const report = selectedReport();
    if (!user || !report || !comment().trim()) return;

    const result = await commentPhoto(user, report.id, comment());
    
    if (result.status === 'success') {
      // Refresh the report data
      const { getPhoto } = await import('../services/api');
      const photoResult = await getPhoto(user, report.id);
      if (photoResult.status === 'success' && photoResult.data && photoResult.data.length > 0) {
        const updatedReport = photoResult.data[0];
        setSelectedReport(updatedReport);
        // Update in reports array
        setReports(reports().map(r => 
          r.id === report.id ? updatedReport : r
        ));
      }
      
      setComment('');
    }
  };

  const handleClose = () => {
    setSelectedReport(null);
  };

  return (
    <Show when={selectedReport()}>
      {(report) => (
        <div class="comment-section">
          <div class="comment-header">
            <h2>Report Details</h2>
            <button onClick={handleClose}>Close</button>
          </div>
          <h3>{report().location}</h3>
          <img src={report().uri} alt="Report image" class="report-image-large" />
          <div class="vote-display">Votes: {report().votes}</div>
          
          <div class="comments-container">
            <h3>Comments</h3>
            <div data-testid="comments-list" class="comments-list">
              <For each={report().comments}>
                {(comment) => <div class="comment">{comment}</div>}
              </For>
            </div>
            
            <div class="add-comment">
              <input
                data-testid="comment-input"
                type="text"
                placeholder="Add a comment..."
                value={comment()}
                onInput={(e) => setComment(e.currentTarget.value)}
              />
              <button data-testid="post-comment-button" onClick={handlePostComment}>
                Post Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </Show>
  );
};

export default CommentSection;
