import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createPost } from '../api/posts';
import { uploadImage } from '../api/client';
import { useNavigate } from 'react-router-dom';

export function PostCreatePage() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [file, setFile] = useState<File | null>(null);
	const navigate = useNavigate();
	const qc = useQueryClient();

	const createMutation = useMutation({
		mutationFn: createPost,
		onSuccess: (post) => {
			qc.invalidateQueries({ queryKey: ['posts'] });
			navigate(`/posts/${post.id}`);
		},
	});

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		let imageUrl: string | undefined;
		if (file) imageUrl = await uploadImage(file);
		createMutation.mutate({ title, content, imageUrl });
	}

	return (
		<form onSubmit={onSubmit} className="bg-white rounded-lg p-6 shadow space-y-4">
			<div>
				<label className="block text-sm font-medium">Title</label>
				<input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" required maxLength={140} />
			</div>
			<div>
				<label className="block text-sm font-medium">Content</label>
				<textarea value={content} onChange={(e) => setContent(e.target.value)} className="mt-1 w-full rounded border px-3 py-2 h-40" required />
			</div>
			<div>
				<label className="block text-sm font-medium">Image</label>
				<input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mt-1" />
			</div>
			<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50" disabled={createMutation.isPending}>
				{createMutation.isPending ? 'Creating...' : 'Create Post'}
			</button>
		</form>
	);
}
