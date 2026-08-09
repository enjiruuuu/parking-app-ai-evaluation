import { Component, createSignal, Show } from 'solid-js';
import { createPhoto } from '../services/api';
import { currentUser } from '../stores/userStore';
import { reports, setReports, showCreateModal, setShowCreateModal } from '../stores/reportStore';

const CreateReportModal: Component = () => {
  const [title, setTitle] = createSignal('');
  const [imageUri, setImageUri] = createSignal('');
  const [imageFile, setImageFile] = createSignal<File | null>(null);

  const handleImageChange = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageUri(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const user = currentUser();
    if (!user || !title() || !imageUri()) return;

    const result = await createPhoto(user, title(), imageUri());
    
    if (result.status === 'success') {
      // Refresh reports
      const { getPhotos } = await import('../services/api');
      const photosResult = await getPhotos(user);
      if (photosResult.status === 'success' && photosResult.data) {
        setReports(photosResult.data);
      }
      
      // Reset and close
      setTitle('');
      setImageUri('');
      setImageFile(null);
      setShowCreateModal(false);
    }
  };

  const handleClose = () => {
    setShowCreateModal(false);
    setTitle('');
    setImageUri('');
    setImageFile(null);
  };

  return (
    <Show when={showCreateModal()}>
      <div class="modal-overlay">
        <div class="modal-content">
          <h2>Create New Report</h2>
          <input
            data-testid="report-title-input"
            type="text"
            placeholder="Report title"
            value={title()}
            onInput={(e) => setTitle(e.currentTarget.value)}
          />
          <input
            data-testid="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button data-testid="submit-report-button" onClick={handleSubmit}>
            Submit Report
          </button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </Show>
  );
};

export default CreateReportModal;
