import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { SchematicLabel } from '../../lib/SchematicLabel';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Marked config
marked.setOptions({
  breaks: true,
  gfm: true,
  smartypants: true,
});

export default function Admin() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editorMode, setEditorMode] = useState('new'); // 'new' or 'edit'
  const [selectedPost, setSelectedPost] = useState(null);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [contentMarkdown, setContentMarkdown] = useState('');
  const [existingPosts, setExistingPosts] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    supabase?.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
    });
    const { data: { subscription } } = supabase?.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });
    return () => subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchPosts();
    }
  }, [session]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        setMessage({ type: 'error', text: `Failed to load posts: ${error.message}` });
      } else {
        setExistingPosts(data || []);
      }
    } catch (e) {
      setMessage({ type: 'error', text: `Network error: ${e.message}` });
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage({ type: 'error', text: 'Email and password required' });
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleNew = () => {
    setEditorMode('new');
    setSelectedPost(null);
    setTitle('');
    setExcerpt('');
    setTags('');
    setDate(new Date().toISOString().split('T')[0]);
    setContentMarkdown('');
    setMessage({ type: '', text: '' });
  };

  const handleEdit = (postId) => {
    const post = existingPosts.find((p) => p.id === postId);
    if (!post) return;
    setSelectedPost(post);
    setEditorMode('edit');
    setTitle(post.title);
    setExcerpt(post.excerpt || '');
    setTags(post.tags?.join(', ') || '');
    setDate(post.date_published || new Date(post.created_at).toISOString().split('T')[0]);
    setContentMarkdown(post.content_markdown || '');
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (postId) => {
    if (!confirm('Delete this post?')) return;
    try {
      const { error } = await supabase.from('posts').delete().eq('id', postId);
      if (error) {
        setMessage({ type: 'error', text: `Delete failed: ${error.message}` });
      } else {
        setMessage({ type: 'success', text: 'Post deleted!' });
        fetchPosts();
        if (selectedPost?.id === postId) {
          handleNew();
        }
      }
    } catch (e) {
      setMessage({ type: 'error', text: `Network error: ${e.message}` });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitErr(null);
    setSubmitSuccess(false);
    try {
      let slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      if (!slug) slug = 'untitled';

      // Check for slug collision and append -2, -3, ... if needed
      let finalSlug = slug;
      let counter = 1;
      while (true) {
        const { data: existing, error: checkErr } = await supabase
          .from('posts')
          .select('id')
          .eq('slug', finalSlug)
          .limit(1);
        if (checkErr) {
          setSubmitErr(`Slug check failed: ${checkErr.message}`);
          setIsSubmitting(false);
          return;
        }
        if (!existing?.length) break;
        counter++;
        finalSlug = `${slug}-${counter}`;
      }

      const { error } = await supabase.from('posts').insert({
        title,
        slug: finalSlug,
        excerpt,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        content_html: DOMPurify.sanitize(marked.parse(contentMarkdown)),
        date_published: date,
        content_markdown: contentMarkdown,
      });

      if (error) {
        setSubmitErr(error.message);
      } else {
        setSubmitSuccess(true);
        setTitle('');
        setExcerpt('');
        setTags('');
        setDate(new Date().toISOString().split('T')[0]);
        setContentMarkdown('');
        fetchPosts();
      }
    } catch (e) {
      setSubmitErr(e.message || 'Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  function EditPostForm({ post, onPostUpdated }) {
    const [title, setTitle] = useState(post.title);
    const [excerpt, setExcerpt] = useState(post.excerpt || '');
    const [tags, setTags] = useState(post.tags?.join(', ') || '');
    const [contentMarkdown, setContentMarkdown] = useState(post.content_markdown || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitErr, setSubmitErr] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
      // Keep slug immutable on edit — no regeneration
      setTitle(post.title);
      setExcerpt(post.excerpt || '');
      setTags(post.tags?.join(', ') || '');
      setContentMarkdown(post.content_markdown || '');
    }, [post.id, post.title, post.excerpt, post.tags, post.content_markdown]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitErr(null);
      setSubmitSuccess(false);
      try {
        const { error } = await supabase
          .from('posts')
          .update({
            title,
            excerpt,
            tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
            content_html: DOMPurify.sanitize(marked.parse(contentMarkdown)),
            content_markdown: contentMarkdown,
          })
          .eq('id', post.id);

        if (error) {
          setSubmitErr(error.message);
        } else {
          setSubmitSuccess(true);
          onPostUpdated();
        }
      } catch (e) {
        setSubmitErr(e.message || 'Network error');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="border border-[rgba(74,98,116,0.3)] bg-[#e4dfd3]/90 p-6 pixel-corners space-y-4">
        <div>
          <label className="fig-label block mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-b border-[rgba(74,98,116,0.4)] text-[#1a1c23] font-display text-base uppercase tracking-tight pb-1 focus:outline-none focus:border-[#c45b3e]"
            placeholder="Post title…"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="fig-label block mb-1">Date Published</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent border-b border-[rgba(74,98,116,0.4)] text-[#1a1c23] font-mono text-sm pb-1 focus:outline-none focus:border-[#c45b3e]"
            />
          </div>
          <div>
            <label className="fig-label block mb-1">Tags (comma-separated)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-transparent border-b border-[rgba(74,98,116,0.4)] text-[#1a1c23] font-mono text-sm pb-1 focus:outline-none focus:border-[#c45b3e]"
              placeholder="game-dev, unity"
            />
          </div>
        </div>
        <div>
          <label className="fig-label block mb-1">Excerpt</label>
          <input
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full bg-transparent border-b border-[rgba(74,98,116,0.4)] text-[#1a1c23] font-mono text-sm pb-1 focus:outline-none focus:border-[#c45b3e]"
            placeholder="One-line preview…"
          />
        </div>
        <div>
          <label className="fig-label block mb-1">Content (Markdown)</label>
          <textarea
            value={contentMarkdown}
            onChange={(e) => setContentMarkdown(e.target.value)}
            rows={16}
            className="w-full bg-transparent border border-[rgba(74,98,116,0.4)] text-[#1a1c23] font-mono text-xs p-3 focus:outline-none focus:border-[#c45b3e] resize-y"
            placeholder="# Heading&#10;&#10;Paragraph with **bold** and `code`."
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="py-2 px-6 font-mono text-xs uppercase tracking-widest border border-[#c45b3e] text-[#c45b3e] hover:bg-[#c45b3e] hover:text-paper transition-colors disabled:opacity-40"
          >
            {isSubmitting ? 'Saving…' : 'Update'}
          </button>
          <button
            onClick={() => { setEditorMode('new'); setTitle(''); setDate(new Date().toISOString().split('T')[0]); setExcerpt(''); setTags(''); setContentMarkdown(''); setSubmitErr(null); setSubmitSuccess(false); }}
            className="py-2 px-4 font-mono text-xs uppercase tracking-widest border border-[rgba(74,98,116,0.4)] text-[#6b7a8d] hover:text-paper transition-colors"
          >
            Clear
          </button>
        </div>
        {submitErr && <p className="text-red-400 font-mono text-xs">{submitErr}</p>}
        {submitSuccess && <p className="text-[#c45b3e] font-mono text-xs">Post saved!</p>}
      </div>
    );
  }

  function CreatePostForm({ onPostCreated }) {
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [tags, setTags] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitErr, setSubmitErr] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitErr(null);
      setSubmitSuccess(false);
      try {
        let slug = title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        if (!slug) slug = 'untitled';

        // Check for slug collision and append -2, -3, ... if needed
        let finalSlug = slug;
        let counter = 1;
        while (true) {
          const { data: existing, error: checkErr } = await supabase
            .from('posts')
            .select('id')
            .eq('slug', finalSlug)
            .limit(1);
          if (checkErr) {
            setSubmitErr(`Slug check failed: ${checkErr.message}`);
            setIsSubmitting(false);
            return;
          }
          if (!existing?.length) break;
          counter++;
          finalSlug = `${slug}-${counter}`;
        }

        const { error } = await supabase.from('posts').insert({
          title,
          slug: finalSlug,
          excerpt,
          tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
          content_html: DOMPurify.sanitize(marked.parse(contentMarkdown)),
          date_published: date,
          content_markdown: contentMarkdown,
        });

        if (error) {
          setSubmitErr(error.message);
        } else {
          setSubmitSuccess(true);
          setTitle('');
          setExcerpt('');
          setTags('');
          setContentMarkdown('');
          onPostCreated();
        }
      } catch (e) {
        setSubmitErr(e.message || 'Network error');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="border border-[rgba(74,98,116,0.3)] bg-[#e4dfd3]/90 p-6 pixel-corners space-y-4">
        <div>
          <label className="fig-label block mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-b border-[rgba(74,98,116,0.4)] text-[#1a1c23] font-display text-base uppercase tracking-tight pb-1 focus:outline-none focus:border-[#c45b3e]"
            placeholder="Post title…"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="fig-label block mb-1">Date Published</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent border-b border-[rgba(74,98,116,0.4)] text-[#1a1c23] font-mono text-sm pb-1 focus:outline-none focus:border-[#c45b3e]"
            />
          </div>
          <div>
            <label className="fig-label block mb-1">Tags (comma-separated)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-transparent border-b border-[rgba(74,98,116,0.4)] text-[#1a1c23] font-mono text-sm pb-1 focus:outline-none focus:border-[#c45b3e]"
              placeholder="game-dev, unity"
            />
          </div>
        </div>
        <div>
          <label className="fig-label block mb-1">Excerpt</label>
          <input
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full bg-transparent border-b border-[rgba(74,98,116,0.4)] text-[#1a1c23] font-mono text-sm pb-1 focus:outline-none focus:border-[#c45b3e]"
            placeholder="One-line preview…"
          />
        </div>
        <div>
          <label className="fig-label block mb-1">Content (Markdown)</label>
          <textarea
            value={contentMarkdown}
            onChange={(e) => setContentMarkdown(e.target.value)}
            rows={16}
            className="w-full bg-transparent border border-[rgba(74,98,116,0.4)] text-[#1a1c23] font-mono text-xs p-3 focus:outline-none focus:border-[#c45b3e] resize-y"
            placeholder="# Heading&#10;&#10;Paragraph with **bold** and `code`."
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="py-2 px-6 font-mono text-xs uppercase tracking-widest border border-[#c45b3e] text-[#c45b3e] hover:bg-[#c45b3e] hover:text-paper transition-colors disabled:opacity-40"
          >
            {isSubmitting ? 'Saving…' : 'Publish'}
          </button>
          <button
            onClick={() => { setTitle(''); setExcerpt(''); setTags(''); setContentMarkdown(''); setSubmitErr(null); setSubmitSuccess(false); }}
            className="py-2 px-4 font-mono text-xs uppercase tracking-widest border border-[rgba(74,98,116,0.4)] text-[#6b7a8d] hover:text-paper transition-colors"
          >
            Clear
          </button>
        </div>
        {submitErr && <p className="text-red-400 font-mono text-xs">{submitErr}</p>}
        {submitSuccess && <p className="text-[#c45b3e] font-mono text-xs">Post created!</p>}
      </div>
    );
  }

  // ── Login screen ─────────────────────────────────────────────
  if (!session) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <SchematicLabel fig="08" title="ADMIN" />
          <p className="text-divider">===================</p>
          <div className="border border-[rgba(74,98,116,0.3)] bg-[#e4dfd3]/90 p-6 pixel-corners">
            <label className="fig-label block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-[rgba(74,98,116,0.4)] text-[#1a1c23] font-mono text-sm pb-1 focus:outline-none focus:border-[#c45b3e]"
              placeholder="your@email.com"
            />
            <label className="fig-label block mb-2 mt-4">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full bg-transparent border-b border-[rgba(74,98,116,0.4)] text-[#1a1c23] font-mono text-sm pb-1 focus:outline-none focus:border-[#c45b3e]"
              placeholder="Enter password…"
            />
            {message.text && (
              <p className={`mt-3 text-xs ${message.type === 'error' ? 'text-red-500' : 'text-[#c45b3e]'}`}>{message.text}</p>
            )}
            <button
              onClick={handleLogin}
              className="mt-4 w-full py-2 text-xs uppercase tracking-widest font-mono border border-[#c45b3e] text-[#c45b3e] hover:bg-[#c45b3e] hover:text-paper transition-colors"
            >
              Sign In
            </button>
          </div>
          <div className="pixel-br-tr" />
          <div className="pixel-br-bl" />
        </div>
      </section>
    );
  }

  // ── Editor ───────────────────────────────────────────────────
  return (
    <section className="relative py-12 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <SchematicLabel fig="08" title="ADMIN PANEL" />
        <p className="text-divider">===================</p>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleNew}
            className={`font-mono text-xs uppercase tracking-widest py-1 px-3 transition-colors ${editorMode === 'new' ? 'text-[#c45b3e] border-b-2 border-[#c45b3e]' : 'text-[#4a6274]'}`}
          >
            + New Post
          </button>
          <button
            onClick={() => { setEditorMode('edit'); setMessage({ type: '', text: '' }); }}
            className={`font-mono text-xs uppercase tracking-widest py-1 px-3 transition-colors ${editorMode === 'edit' ? 'text-[#c45b3e] border-b-2 border-[#c45b3e]' : 'text-[#4a6274]'}`}
          >
            Edit Posts
          </button>
          <button
            onClick={handleSignOut}
            className="ml-auto font-mono text-xs uppercase tracking-widest py-1 px-3 text-[#6b7a8d] hover:text-[#c45b3e]"
          >
            Sign Out
          </button>
        </div>

        {/* Message */}
        {message.text && (
          <p className={`mb-4 text-xs font-mono ${message.type === 'error' ? 'text-red-400' : 'text-[#c45b3e]'}`}>
            {message.text}
          </p>
        )}

        {/* ── New / Edit form ── */}
        {(editorMode === 'new' || (editorMode === 'edit' && selectedPost)) && (
          <div className="border border-[rgba(74,98,116,0.3)] bg-[#e4dfd3]/90 p-6 pixel-corners space-y-4">
            {editorMode === 'new' ? (
              <CreatePostForm onPostCreated={fetchPosts} />
            ) : (
              <EditPostForm post={selectedPost} onPostUpdated={fetchPosts} />
            )}
          </div>
        )}

        {/* ── Post list (edit mode) ── */}
        {editorMode === 'edit' && (
          <div className="mt-6 space-y-2">
            {existingPosts.length === 0 ? (
              <p className="text-[#4a6274] font-mono text-xs">No posts yet. Create your first one above.</p>
            ) : (
              existingPosts.map((p) => (
                <div key={p.id} className="flex items-center gap-4 p-3 border border-[rgba(74,98,116,0.2)] bg-[#e4dfd3]/50">
                  <span className="fig-label text-[10px] flex-1 truncate">{p.slug}</span>
                  <span className="text-xs text-[#1a1c23] font-medium flex-1 truncate">{p.title}</span>
                  <button
                    onClick={() => handleEdit(p.id)}
                    className="font-mono text-[10px] uppercase text-[#c45b3e] hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="font-mono text-[10px] uppercase text-[#6b7a8d] hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        <div className="pixel-br-tr mt-6" />
        <div className="pixel-br-bl mt-6" />
      </div>
    </section>
  );
}