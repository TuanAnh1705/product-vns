'use client';

import { useEffect } from 'react';

export default function ContentProtection() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && ['s', 'S', 'u', 'U', 'p', 'P', 'a', 'A'].includes(e.key)) {
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && ['i', 'I', 'j', 'J'].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === 'F12') e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
}
