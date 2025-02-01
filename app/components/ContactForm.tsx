import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { submitContactForm } from '@/app/actions';

export function ContactForm() {
   
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setStatus('submitting');
      await submitContactForm(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setError(err.message);
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
        <p className="text-gray-300">Thank you for reaching out. I'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
            placeholder="Your name"
            required
            disabled={status === 'submitting'}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
            placeholder="your@email.com"
            required
            disabled={status === 'submitting'}
          />
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
          placeholder="What's this about?"
          required
          disabled={status === 'submitting'}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 min-h-[150px]"
          placeholder="Tell me about your project..."
          required
          disabled={status === 'submitting'}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-white text-black px-8 py-4 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50"
        disabled={status === 'submitting'}
      >
        <Send className="w-5 h-5 mr-2" />
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}