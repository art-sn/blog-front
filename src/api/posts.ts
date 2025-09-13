import { api } from './client';

export interface Post {
	id: number;
	title: string;
	content: string;
	imageUrl?: string | null;
	createdAt: string;
	updatedAt: string;
}

export type CreatePostInput = {
	title: string;
	content: string;
	imageUrl?: string;
};

export async function listPosts() {
	const res = await api.get<Post[]>('/posts');
	return res.data;
}

export async function getPost(id: number) {
	const res = await api.get<Post>(`/posts/${id}`);
	return res.data;
}

export async function createPost(input: CreatePostInput) {
	const res = await api.post<Post>('/posts', input);
	return res.data;
}
