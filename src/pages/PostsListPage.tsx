import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { listPosts } from '../api/posts';

export function PostsListPage() {
	const { data: posts, isLoading } = useQuery({ queryKey: ['posts'], queryFn: listPosts });
	if (isLoading) return <div>Loading...</div>;
	return (
		<div className="space-y-4">
			{posts?.map((p) => (
				<article key={p.id} className="bg-white rounded-lg p-4 shadow">
					<h2 className="text-lg font-semibold"><Link to={`/posts/${p.id}`}>{p.title}</Link></h2>
					<p className="text-sm text-gray-600">{new Date(p.createdAt).toLocaleString()}</p>
					{p.imageUrl && (
						<img src={p.imageUrl} alt="" className="mt-2 max-h-60 rounded object-cover" />
					)}
					<p className="mt-2 line-clamp-3">{p.content}</p>
				</article>
			))}
		</div>
	);
}
