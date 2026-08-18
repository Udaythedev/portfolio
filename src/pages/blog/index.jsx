import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { SchematicLabel } from '../../lib/SchematicLabel';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) {
          console.error('[BlogList] fetch error:', error);
          setErr(error.message);
          setLoading(false);
          return;
        }
        const transformed = (data ?? []).map((p) => ({
          slug: p.slug,
          title: p.title,
          date: p.date_published || new Date(p.created_at).toISOString().split('T')[0],
          excerpt: p.excerpt || '',
          tags: p.tags || [],
          html: p.content_html || '',
        }));
        setPosts(transformed);
      } catch (e) {
        console.error('[BlogList] network error:', e);
        setErr(e.message || 'Network error — check browser console');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <section className="relative py-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <SchematicLabel fig="07" title="WRITES" />
        <p className="text-divider">===================</p>

        {loading ? (
          <p className="text-[#4a6274] font-mono text-sm animate-pulse">Loading posts…</p>
        ) : err ? (
          <p className="text-red-400 font-mono text-sm">Error: {err}</p>
        ) : posts.length === 0 ? (
          <p className="text-[#4a6274] font-mono text-sm">No posts yet. Check back soon.</p>
        ) : (
          <motion.ul className="space-y-6">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} delay={i * 0.06} />
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}

function PostCard({ post, delay }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="block p-5 border border-[rgba(74,98,116,0.3)] bg-[#e4dfd3]/90 relative pixel-corners hover:border-[rgba(196,91,62,0.6)] transition-colors group"
      >
        <div className="flex items-baseline gap-3 mb-2 flex-wrap">
          <span className="fig-label" style={{ color: '#c45b3e' }}>{post.date}</span>
          {post.tags?.map((t) => (
            <span key={t} className="fig-label text-[10px] text-[#4a6274]">#{t}</span>
          ))}
        </div>
        <h2 className="font-display text-lg font-bold text-[#1a1c23] uppercase tracking-tight group-hover:text-[#c45b3e] transition-colors">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-xs text-[#6b6b6b] mt-1 leading-relaxed">{post.excerpt}</p>
        )}
        <div className="pixel-br-tr" />
        <div className="pixel-br-bl" />
        <div className="pixel-br-tr" />
        <div className="pixel-br-bl" />
      </Link>
    </motion.li>
  );
}
