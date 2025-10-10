'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Compass } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-4' 
          : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Left */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo/AfriArtt.png"
                  alt="AfriArtt"
                  width={100}
                  height={50}
                />
            </Link>
          </motion.div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    isScrolled
                      ? activeLink === link.href
                        ? 'text-[#DF620C]'
                        : 'text-gray-700 hover:text-[#DF620C]'
                      : activeLink === link.href
                      ? 'text-[#ffffff]'
                      : 'text-white hover:text-[#DF620C]'
                  }`}
                  onMouseEnter={() => setActiveLink(link.href)}
                  onMouseLeave={() => setActiveLink(pathname)}
                >
                  {link.name}
                  
                  {/* Active indicator */}
                  {(activeLink === link.href || 
                    (link.href !== '/' && pathname.startsWith(link.href))) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DF620C]"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-lg bg-[#DF620C] opacity-0 hover:opacity-10 transition-opacity duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Get Started Button - Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                isScrolled
                  ? 'bg-[#DF620C] text-white hover:bg-[#c4560a] shadow-md'
                  : 'bg-white text-[#DF620C] hover:bg-gray-100 shadow-lg'
              }`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: isScrolled 
                  ? '0 10px 25px -5px rgba(223, 98, 12, 0.4)' 
                  : '0 10px 25px -5px rgba(255, 255, 255, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
              <Compass className='w-4 h-4'/>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile menu button (optional) */}
        <div className="md:hidden flex justify-center mt-4">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors duration-300 ${
                  isScrolled
                    ? activeLink === link.href
                      ? 'bg-[#DF620C] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-[#DF620C] hover:text-white'
                    : activeLink === link.href
                    ? 'bg-[#DF620C] text-white'
                    : 'bg-white/20 text-white hover:bg-[#DF620C]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;