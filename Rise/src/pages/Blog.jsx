import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { blogPosts } from '../data/siteContent';

const Blog = () => (
  <PageLayout title="Blog">
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Blog</h1>
        <p className="text-blue-100 text-lg">Insights on web development, AI automation, and digital business.</p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="space-y-8">
        {blogPosts.map((post) => (
          <article key={post.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <time className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-3">
              <Link to={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">{post.title}</Link>
            </h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="text-blue-600 font-semibold text-sm hover:underline">Read more →</Link>
          </article>
        ))}
      </div>
    </section>
  </PageLayout>
);

export default Blog;
