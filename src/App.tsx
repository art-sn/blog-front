import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { PostsListPage } from './pages/PostsListPage';
import { PostCreatePage } from './pages/PostCreatePage';
import { PostViewPage } from './pages/PostViewPage';
import './index.css';

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<div className="min-h-screen bg-gray-50 text-gray-900">
					<header className="border-b bg-white">
						<div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
							<Link to="/" className="text-xl font-semibold">Simple Blog</Link>
							<nav className="space-x-4">
								<Link to="/" className="hover:underline">Home</Link>
								<Link to="/new" className="hover:underline">New Post</Link>
							</nav>
						</div>
					</header>
					<main className="max-w-4xl mx-auto px-4 py-6">
						<Routes>
							<Route path="/" element={<PostsListPage />} />
							<Route path="/new" element={<PostCreatePage />} />
							<Route path="/posts/:id" element={<PostViewPage />} />
						</Routes>
					</main>
				</div>
			</BrowserRouter>
		</QueryClientProvider>
	);
}
