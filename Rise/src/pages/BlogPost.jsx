import { Link, useParams } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { blogPosts } from '../data/siteContent';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <PageLayout title="Post Not Found">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link to="/blog" className="text-blue-600 hover:underline">← All Posts</Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={post.title}>
      <article className="container mx-auto px-4 py-16 max-w-3xl">
        <Link to="/blog" className="text-blue-600 text-sm hover:underline mb-6 inline-block">← Back to Blog</Link>
        <time className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-8">{post.title}</h1>
        <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-line leading-relaxed">
          {post.content}
        </div>
      </article>
    </PageLayout>
  );
};

export default BlogPost;
