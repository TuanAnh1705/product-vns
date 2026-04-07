'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ChevronRight } from 'lucide-react';

const footerData = {
  emailLink: { label: 'info@vietnamsourcing.co', url: 'mailto:info@vietnamsourcing.co' },
  consultationLink: { label: 'Schedule a free consultation', url: 'https://vietnamsourcing.co/contact/' },
  title: 'Your reliable supply chain partner',
  description:
    'Manufacturing in a foreign country can be daunting at the best of times, allow us to manage your entire supply chain without worry.',
  insideLinks: [{ label: 'About Us', url: 'https://vietnamsourcing.co/about/' }],
  column2Links: [
    { label: 'Order Process', url: 'https://vietnamsourcing.co/order-process/' },
    { label: 'Careers', url: 'https://vietnamsourcing.co/careers/' },
    { label: 'Blog', url: 'https://vietnamsourcing.co/blog/' },
  ],
  column3Links: [
    { label: 'Privacy Policy', url: 'https://vietnamsourcing.co/privacy-policy/' },
    { label: 'Terms of Use', url: 'https://vietnamsourcing.co/terms-of-use/' },
  ],
  socialLinks: [
    { icon: 'facebook', url: 'https://www.facebook.com/vietnamsourcing.co' },
    { icon: 'instagram', url: 'https://www.instagram.com/vietnamsourcing.co' },
    { icon: 'linkedin', url: 'https://www.linkedin.com/company/vietnam-sourcing-co/about/?viewAsMember=true' },
  ],
};

function SocialIcon({ icon }: { icon: string }) {
  if (icon === 'facebook')
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  if (icon === 'instagram')
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    );
  if (icon === 'linkedin')
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  return null;
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const topSectionRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current || !topSectionRef.current) return;

      const footerRect = footerRef.current.getBoundingClientRect();
      const topSectionHeight = topSectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const footerTop = footerRect.top;
      const footerBottom = footerRect.bottom;

      const startPoint = windowHeight * 0.9;
      const endPoint = windowHeight * 0.6;

      if (footerTop <= startPoint && footerBottom > 0) {
        const progress = Math.min(
          Math.max((startPoint - footerTop) / (startPoint - endPoint), 0),
          1
        );

        const initialTranslate = topSectionHeight;
        const finalTranslate = 0;
        const newTranslateY = initialTranslate - (initialTranslate - finalTranslate) * progress;

        setTranslateY(newTranslateY);
      } else if (footerTop > startPoint) {
        setTranslateY(topSectionHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative text-white"
      style={{ marginBottom: '-100px', overflow: 'clip' }}
    >
      {/* Animation Wrapper - Cụm 1: Groups Phần 1 & Phần 2 for scroll animation */}
      <div
        ref={topSectionRef}
        className="relative z-20 transition-transform duration-500 ease-out"
        style={{
          transform: `translateY(${translateY}px)`,
        }}
      >
        {/* Phần 1: Header Links - Full width, no gap */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Email Link - Yellow text on Green background */}
            <Link
              href={footerData.emailLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between px-8 md:px-50 py-4"
              style={{ backgroundColor: '#2a4233' }}
            >
              <div className="flex items-center gap-3 md:text-[15px] tracking-tighter">
                <Mail className="w-5 h-5 text-[#f4ca68]" />
                <span className="text-[#f4ca68] font-blaak font-medium relative inline-block">
                  {footerData.emailLink.label}
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-[#f4ca68] transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left"></span>
                </span>
              </div>
            </Link>

            {/* Consultation Link - Green text on Yellow background */}
            <Link
              href={footerData.consultationLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between pl-8 md:pl-16 pr-8 md:pr-50 py-4 md:py-5 md:text-[15px] tracking-tighter"
              style={{ backgroundColor: '#f4ca68' }}
            >
              <span className="text-[#152119] font-blaak font-medium relative inline-block">
                {footerData.consultationLink.label}
                <span className="absolute -bottom-1 left-0 w-full h-px bg-[#152119] transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left"></span>
              </span>
              <ChevronRight className="w-5 h-5 text-[#152119]" />
            </Link>
          </div>
        </div>

        {/* Phần 2: Title and Description - Có nền màu xanh */}
        <div style={{ backgroundColor: '#152119' }}>
          <div className="container mx-auto px-4 md:px-80 py-12">
            <div className="flex items-center justify-between gap-4 lg:block">
              <div className="max-w-2xl">
                <h2 className="text-xl md:text-3xl font-blaak-light tracking-tighter mb-2 text-[#f4ca68]">
                  {footerData.title}
                </h2>
                <p className="text-white lg:text-gray-300 font-svn-regular text-md tracking-tighter">
                  {footerData.description}
                </p>
              </div>
              {/* Mobile-only logo */}
              <div className="shrink-0 lg:hidden mt-10">
                <div className="relative w-29 h-15">
                  <Image
                    src="/assets/logo.png"
                    alt="Vietnam Sourcing Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div style={{ backgroundColor: '#152119' }}>
          <div className="container mx-auto px-8 md:px-30">
            <div className="border-t border-gray-700 mx-4 md:mx-0"></div>
          </div>
        </div>
      </div>

      {/* Phần 3: Logo + Page Links + Social - Cụm 2 */}
      <div className="relative z-10 m-0 p-0" style={{ backgroundColor: '#152119' }}>
        <div className="container mx-auto px-8 md:px-30 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 items-start lg:items-end">
            {/* Logo - ẩn trên mobile, hiện trên desktop */}
            <div className="hidden lg:block lg:col-span-3">
              <Link href="/" className="relative inline-block w-80 h-31">
                <Image
                  src="/assets/logo.png"
                  alt="Vietnam Sourcing Logo"
                  fill
                  className="object-contain object-left"
                />
              </Link>
            </div>

            {/* Column 1: Inside + First Link */}
            <div className="col-span-1 lg:col-span-2 lg:-ml-18">
              <div className="flex flex-col justify-end h-full">
                <div className="mb-2">
                  <span className="text-[#f4ca68] font-svn-regular text-sm">Inside</span>
                </div>
                <ul className="space-y-3">
                  {footerData.insideLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group font-svn-regular text-md tracking-tighter text-white lg:text-gray-400 hover:text-[#f4ca68] transition-colors relative inline-block"
                      >
                        {link.label}
                        <span className="absolute -bottom-1 left-0 w-full h-px bg-[#f4ca68] transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 2 + (Column 3 trên desktop) */}
            <div className="col-span-1 lg:col-span-4 lg:-ml-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-end">
                {/* Column 2: Order Process, Careers, Blog */}
                <div className="flex flex-col justify-end h-full">
                  <ul className="space-y-1">
                    {footerData.column2Links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group font-svn-regular text-white lg:text-gray-400 hover:text-[#f4ca68] transition-colors relative inline-block text-md tracking-tighter"
                        >
                          {link.label}
                          <span className="absolute -bottom-1 left-0 w-full h-px bg-[#f4ca68] transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left"></span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: chỉ hiện trên desktop */}
                <div className="hidden lg:flex flex-col justify-end h-full">
                  <ul className="space-y-1 mb-2">
                    {footerData.column3Links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group font-svn-regular text-gray-400 hover:text-[#f4ca68] transition-colors relative inline-block text-md tracking-tighter"
                        >
                          {link.label}
                          <span className="absolute -bottom-1 left-0 w-full h-px bg-[#f4ca68] transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left"></span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-400 font-svn-regular text-md tracking-tighter">
                    © 2023 Vietnam Sourcing Inc.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3 mobile: full width, chỉ hiện trên mobile */}
            <div className="col-span-2 lg:hidden">
              <ul className="space-y-1 mb-2">
                {footerData.column3Links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group font-svn-regular text-white hover:text-[#f4ca68] transition-colors relative inline-block text-md tracking-tighter"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-full h-px bg-[#f4ca68] transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left"></span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="text-white font-svn-regular text-md tracking-tighter">
                © 2026 Vietnam Sourcing Inc.
              </p>
            </div>

            {/* Social Links */}
            <div className="col-span-2 lg:col-span-3 flex justify-center lg:justify-end">
              <div className="flex gap-4">
                {footerData.socialLinks.map((social) => (
                  <a
                    key={social.icon}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f4ca68] hover:text-[#B8961E] transition-colors"
                  >
                    <SocialIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
