import { useEffect } from 'react';
import './index.css';
import { track } from './lib/analytics.js';

export default function App() {
  // fire a page view on first mount
  useEffect(() => {
    track('page_view', { path: window.location.pathname });
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Strategic Seat</h1>
      <p className="text-gray-600 max-w-prose text-center">
        High-converting landing page starter. Replace this with your real content.
      </p>
      {/* Example CTA; feel free to remove */}
      <a
        href="#contact"
        className="mt-8 rounded-xl border px-6 py-3 hover:bg-gray-50 transition"
        onClick={() => track('cta_click', { id: 'hero_primary' })}
      >
        Book a Call
      </a>
    </main>
  );
}
