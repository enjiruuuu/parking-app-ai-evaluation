import { createSignal } from 'solid-js';
import { Photo } from '../services/api';

export const [reports, setReports] = createSignal<Photo[]>([]);
export const [selectedReport, setSelectedReport] = createSignal<Photo | null>(null);
export const [showCreateModal, setShowCreateModal] = createSignal(false);
