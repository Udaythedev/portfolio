import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || '';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [editorMode, setEditorMode] = useState('new'); // 'new' | 'edit'
  const [editingId, setEditingId] = useState(null);

  // Form state
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [contentMarkdown, setContentMarkdown] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [existingPosts, setExistingPosts] = useState([]);

  // Fetch posts for editing
  useEffect(() => {
    if (!unlocked) return;
    supabase.from('posts').select('id, slug, title, created_at').order('created_at', { ascending: false }).then(({ data }) => {
      setExistingPosts(data || []);
    });
  }, [unlocked, editorMode]);

  // Load post when switching to edit mode
  useEffect(() => {
    if (editorMode === 'edit' && editingId) {
      const post = existingPosts.find((p) => p.id === editingId);
      if (post) {
        supabase.from('posts').select('*').eq('id', editingId).single().then(({ data }) => {
          if (data) {
            setTitle(data.title);
            setDate(data.date_published || new Date(data.created_at).toISOString().split('T')[0]);
            setExcerpt(data.excerpt || '');
            setTagsInput((data.tags || []).join(', '));
            setContentMarkdown(data.content_markdown || '');
          }
        });
      }
    }
  }, [editorMode, editingId]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setUnlocked(true);
      setMessage({ type: 'success', text: 'Access granted.' });
    } else {
      setMessage({ type: 'error', text: 'Incorrect password.' });
    }
  };

  const handleNew = () => {
    setEditorMode('new');
    setTitle(''); setDate(''); setExcerpt('');
    setTagsInput(''); setContentMarkdown('');
    setMessage({ type: '', text: '' });
  };

  const handleEdit = (id) => {
    setEditorMode('edit');
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) setMessage({ type: 'error', text: error.message });
    else {
      setExistingPosts((prev) => prev.filter((p) => p.id !== id));
      setMessage({ type: 'success', text: 'Post deleted.' });
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !contentMarkdown.trim()) {
      setMessage({ type: 'error', text: 'Title and content are required.' });
      return;
    }
    setSaving(true);
    setMessage({ type: '', text: '' });

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
    const datePublished = date || new Date().toISOString().split('T')[0];

    // Basic markdown → HTML (headings, bold, italic, code blocks, links)
    let html = contentMarkdown
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br/>')
      .replace(/<br\/><br\/>/g, '</p><p>');
    html = `<p>${html}</p>`;

    const post = { title, slug, date_published: datePublished, excerpt, tags, content_markdown: contentMarkdown, content_html: html };

    if (editorMode === 'new') {
      const { error } = await supabase.from('posts').insert([post]);
      if (error) setMessage({ type: 'error', text: error.message });
      else {
        setMessage({ type: 'success', text: 'Post published!' });
        setTitle(''); setDate(''); setExcerpt(''); setTagsInput(''); setContentMarkdown('');
      }
    } else {
      const { error } = await supabase.from('posts').update(post).eq('id', editingId);
      if (error) setMessage({ type: 'error', text: error.message });
      else {
        setMessage({ type: 'success', text: 'Post updated!' });
      }
    }
    setSaving(false);
  };

  // ── Login screen ─────────────────────────────────────────────
  if (!unlocked) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <SchematicLabel fig="08" title="ADMIN" />
          <p className="text-divider">===================</p>
          <div className="border border-[rgba(74,98,116,0.3)] bg-[#e4dfd3]/90 p-6 pixel-corners">
            <label className="fig-label block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full bg-transparent border-b border-[rgba(74,98,116,0.4)] text-[#1a1c23] font-mono text-sm pb-1 focus:outline-none focus:border-[#c45b3e]"
              placeholder="Enter admin password…"
            />
            {message.text && (
              <p className={`mt-3 text-xs ${message.type === 'error' ? 'text-red-500' : 'text-[#c45b3e]'}`}>{message.text}</p>
            )}
            <button
              onClick={handleLogin}
              className="mt-4 w-full py-2 text-xs uppercase tracking-widest font-mono border border-[#c45b3e] text-[#c45b3e] hover:bg-[#c45b3e] hover:text-paper transition-colors"
            >
              Unlock
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
            className={`font-mono text-xs uppercase tracking-widest py-1 px-3 transition-colors ${
              editorMode === 'new' ? 'text-[#c45b3e] border-b-2 border-[#c45b3e]' : 'text-[#4a6274]'
            }`}
          >
            + New Post
          </button>
          <button
            onClick={() => { setEditorMode('edit'); setMessage({ type: '', text: '' }); }}
            className={`font-mono text-xs uppercase tracking-widest py-1 px-3 transition-colors ${
              editorMode === 'edit' ? 'text-[#c45b3e] border-b-2 border-[#c45b3e]' : 'text-[#4a6274]'
            }`}
          >
            Edit Posts
          </button>
        </div>

        {/* Message */}
        {message.text && (
          <p className={`mb-4 text-xs font-mono ${message.type === 'error' ? 'text-red-400' : 'text-[#c45b3e]'}`}>
            {message.text}
          </p>
        )}

        {/* ── New / Edit form ── */}
        {(editorMode === 'new' || editorMode === 'edit') && (
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
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
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
                disabled={saving}
                className="py-2 px-6 font-mono text-xs uppercase tracking-widest border border-[#c45b3e] text-[#c45b3e] hover:bg-[#c45b3e] hover:text-paper transition-colors disabled:opacity-40"
              >
                {saving ? 'Saving…' : editorMode === 'new' ? 'Publish' : 'Update'}
              </button>
              <button
                onClick={() => { setEditorMode('new'); setTitle(''); setDate(''); setExcerpt(''); setTagsInput(''); setContentMarkdown(''); setMessage({ type: '', text: '' }); }}
                className="py-2 px-4 font-mono text-xs uppercase tracking-widest border border-[rgba(74,98,116,0.4)] text-[#6b7a8d] hover:text-paper transition-colors"
              >
                Clear
              </button>
            </div>
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
