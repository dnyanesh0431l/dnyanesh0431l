'use client';

import { useState, useRef, useEffect } from 'react';
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
}

/**
 * SocialPopup - A floating action button that reveals social media links in a popup card.
 * Positioned fixed at bottom-right corner, follows the design system (colors, card, button styles).
 */
const SocialPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // ===== SOCIAL LINKS CONFIGURATION =====
  // Replace the URLs with your actual profile links.
  const socialLinks: SocialLink[] = [
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://linkedin.com/in/yourusername',
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      url: 'https://instagram.com/yourusername',
    },
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/yourusername',
    },
  ];

  const togglePopup = () => setIsOpen((prev) => !prev);
  const closePopup = () => setIsOpen(false);

  // Close popup when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        closePopup();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close popup on ESC key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div
      ref={popupRef}
      className="fixed bottom-6 right-6 z-50"
      aria-label="Social media popup"
    >
      {/* Popup Card (visible when isOpen = true) */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 animate-fade-in-up">
          <div className="card flex flex-col gap-3 min-w-[160px] shadow-xl">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closePopup} // Close popup after clicking a link
                className="flex items-center gap-3 text-muted hover:text-cyan transition-colors duration-200 text-lg"
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="text-sm font-body">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={togglePopup}
        className="btn w-12 h-12 rounded-full flex items-center justify-center p-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan"
        aria-label="Toggle social links"
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
          />
        </svg>
      </button>

      {/* Animation keyframes for fade-in-up effect */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SocialPopup;