"use client"

import { ChevronsUp } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Scrolltop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Function to show or hide the scroll-to-top button based on scroll position
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > window.innerHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Attach scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
    {isVisible && (
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0 }}
        animate={{opacity:1}}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='fixed bottom-4  right-4 z-50 w-10 h-10  bg-primaryBlue rounded-lg flex items-center justify-center'
      >
        <ChevronsUp strokeWidth={1} className='text-white w-8 h-8' />
      </motion.button>
    )}
  </div>
  );
};

export default Scrolltop;
