const API_BASE = 'http://localhost:3000/photo';

export interface Photo {
  user: string;
  id: string;
  votes: number;
  location: string;
  uri: string;
  comments: string[];
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

export async function registerUser(userid: string): Promise<ApiResponse<null>> {
  const response = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userid }),
  });
  return response.json();
}

export async function getPhotos(userid: string): Promise<ApiResponse<Photo[]>> {
  const response = await fetch(`${API_BASE}?userid=${userid}`);
  return response.json();
}

export async function getPhoto(userid: string, id: string): Promise<ApiResponse<Photo[]>> {
  const response = await fetch(`${API_BASE}/${id}?userid=${userid}`);
  return response.json();
}

export async function createPhoto(userid: string, location: string, uri: string): Promise<ApiResponse<{ id: string }>> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userid, location, uri }),
  });
  return response.json();
}

export async function votePhoto(userid: string, id: string): Promise<ApiResponse<null>> {
  const response = await fetch(`${API_BASE}/vote/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userid }),
  });
  return response.json();
}

export async function commentPhoto(userid: string, id: string, comment: string): Promise<ApiResponse<null>> {
  const response = await fetch(`${API_BASE}/comment/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userid, comment }),
  });
  return response.json();
}
