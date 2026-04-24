import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';

// ── Social Icons ────────────────────────────────────────────────
const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ── Footer Columns ───────────────────────────────────────────────
const platformLinks = [
  { label: 'Courses', href: '#' },
  { label: 'Mentors', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Labs', href: '#' },
  { label: 'For Teams', href: '#' },
];

const companyLinks = [
  { label: 'About Us', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Contact', href: '#' },
];

// ── Footer Component ─────────────────────────────────────────────
const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-400">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Column 1 — Brand */}
          <div className="md:col-span-2">
            <Link to={ROUTES.HOME} className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center transition-transform group-hover:scale-105 flex-shrink-0">
                <span className="text-white font-bold text-base leading-none">{'</>'}</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">CodeShastra</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mt-3">
              Bridging the gap between theoretical knowledge and practical engineering skills. Built for the next generation of architects.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-500 hover:text-white transition-colors duration-200"
              >
                <TwitterIcon />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="text-gray-500 hover:text-white transition-colors duration-200"
              >
                <GitHubIcon />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-500 hover:text-white transition-colors duration-200"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Column 2 — Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">
              Platform
            </h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} CodeShastra. All rights reserved. Designed by Antigravity Studio.
          </p>
          <div className="flex gap-5 text-xs text-gray-600">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
