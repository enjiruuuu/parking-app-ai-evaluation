import { createSignal } from 'solid-js';

export const [currentUser, setCurrentUser] = createSignal<string | null>(null);
export const [alertMessage, setAlertMessage] = createSignal<string | null>(null);
