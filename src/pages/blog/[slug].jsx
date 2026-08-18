import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { SchematicLabel } from '../../lib/SchematicLabel';
import DOMPurify from 'dompurify';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error: err } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .limit(1)
          .single();

        if (err) {
          if (err.code === 'PGRST116') {
            setError('Post not found');
          } else {
            setError(`Failed to load post: ${err.message}`);
          }
        } else {
          setPost(data);
        }
      } catch (e) {
        setError(`Network error: ${e.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#4a6274] font-mono text-sm animate-pulse">Loading…</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <SchematicLabel fig="08" title="ERROR" />
        <p className="text-paper font-display text-xl uppercase">{error || 'Post not found'}</p>
        <Link to="/blog" className="mini-link">← Back to writes</Link>
      </div>
    );
  }

  const d = post.date_published || new Date(post.created_at).toISOString().split('T')[0];
  const tags = post.tags || [];

  return (
    <article className="relative py-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-6">
        <Link to="/blog" className="mini-link text-[10px] mb-6 inline-block">
          ← Back to writes
        </Link>

        <div className="mb-8">
          <SchematicLabel fig="08" title="WRITE" />
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-paper uppercase tracking-tight mt-3 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-baseline gap-3 mt-3 flex-wrap">
            <span className="fig-label text-xs" style={{ color: '#c45b3e' }}>{d}</span>
            {tags.map((t) => (
              <span key={t} className="fig-label text-xs text-[#4a6274]">#{t}</span>
            ))}
          </div>
        </div>

        {/* Render markdown HTML safely */}
        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content_html) }}
        />
      </div>
    </article>
  );
}
