// Add to your App component
import { useEffect } from 'react';
import { initGA, trackEvent } from './lib/analytics';

export default function App() {
  useEffect(() => {
    initGA();
    
    // Track page view
    trackEvent('page_view', {
      page_title: 'Strategic Seat Landing Page',
      page_location: window.location.href
    });
  }, []);
  
  // Rest of your component
}