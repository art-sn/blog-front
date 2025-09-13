import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPost } from '../api/posts';

export function PostViewPage() {
	const params = useParams();
	const id = Number(params.id);
	const { data: post, isLoading } = useQuery({ queryKey: ['post', id], queryFn: () => getPost(id), enabled: Number.isFinite(id) });
	if (isLoading || !post) return <div>Loading...</div>;
	return (
		<article className="bg-white rounded-lg p-6 shadow">
			<h1 className="text-2xl font-bold">{post.title}</h1>
			<p className="text-sm text-gray-600">{new Date(post.createdAt).toLocaleString()}</p>
			{post.imageUrl && (
				<img src={post.imageUrl} alt="" className="mt-4 max-h-96 rounded object-cover" />
			)}
			<p className="mt-4 whitespace-pre-wrap leading-relaxed">{post.content}</p>
		</article>
	);
}
