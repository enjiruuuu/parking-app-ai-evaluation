import { Component, createSignal } from 'solid-js';
import { Photo } from '../services/api';
import { votePhoto } from '../services/api';
import { currentUser } from '../stores/userStore';
import { selectedReport, setSelectedReport, reports, setReports } from '../stores/reportStore';

interface ReportCardProps {
  report: Photo;
}

const ReportCard: Component<ReportCardProps> = (props) => {
  const [localVotes, setLocalVotes] = createSignal(props.report.votes);

  const handleVote = async () => {
    const user = currentUser();
    if (!user) return;

    const result = await votePhoto(user, props.report.id);
    
    if (result.status === 'success') {
      setLocalVotes(prev => prev + 1);
      // Update the report in the reports array
      setReports(reports().map(r => 
        r.id === props.report.id ? { ...r, votes: r.votes + 1 } : r
      ));
    }
  };

  const handleViewDetails = () => {
    setSelectedReport(props.report);
  };

  return (
    <div data-testid="report-card" class="report-card">
      <h3>{props.report.location}</h3>
      <img src={props.report.uri} alt="Report image" class="report-image" />
      <div class="report-actions">
        <button data-testid="vote-button" onClick={handleVote}>
          Vote
        </button>
        <span class="vote-count">{localVotes()}</span>
        <button data-testid="view-details-button" onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default ReportCard;
