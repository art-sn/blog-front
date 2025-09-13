import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({ baseURL });

export async function uploadImage(file: File): Promise<string> {
	const form = new FormData();
	form.append('file', file);
	const res = await api.post<{ url: string }>(`/uploads/image`, form, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return res.data.url;
}
