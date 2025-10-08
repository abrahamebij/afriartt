'use client'

import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';
import { Compass, HeartHandshake, ShieldCheck, UploadIcon, Users } from "lucide-react";
import FeaturedArts from '@/components/home/FeaturedArts';

const Home = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const items = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-[#DF620C]" />,
      title: "Own Your Work",
      desc: "Every upload is verified and owned by you on-chain.",
    },
    {
      icon: <Users className="w-10 h-10 text-[#DF620C]" />,
      title: "Celebrate Culture",
      desc: "Preserve African heritage through digital storytelling.",
    },
    {
      icon: <HeartHandshake className="w-10 h-10 text-[#DF620C]" />,
      title: "Support Creators",
      desc: "Fans can tip artists directly in HBAR.",
    }
  ];

  return (
    <>
      <section 
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#4169A4' }}
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            className="flex flex-col lg:flex-row items-center justify-between gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                variants={itemVariants}
              >
                Preserving African Culture on the Blockchain
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-white/90 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                variants={itemVariants}
              >
                Upload, own, and share African art, music, stories, and performances with proof of authenticity powered by Hedera.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                variants={itemVariants}
              >
                <motion.button 
                  className="px-8 py-3 bg-[#DF620C] text-white font-semibold rounded-lg hover:bg-gray-100 hover:text-[#DF620C] transition-colors duration-300 shadow-lg flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                > 
                  Explore
                  <Compass className="w-4 h-4" />
                </motion.button>
                <motion.button 
                  className="px-25 py-3 bg-white border-2 border-white text-black font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300 shadow-lg flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Upload Art
                  <UploadIcon className='w-4 h-4'/>
                </motion.button>
              </motion.div>
            </div>
            
            {/* Right Image */}
            <motion.div 
              className="lg:w-1/2 flex justify-center"
              variants={itemVariants}
            >
              <div className="relative w-full max-w-md lg:max-w-lg">
                <motion.div
                  className="rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src="/images/heroImg.png"
                    alt="Afriartt"
                    width={500}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
                
                {/* Animated background elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-300 rounded-full opacity-20 -z-10"
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-300 rounded-full opacity-20 -z-10"
                  animate={{ 
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section className="mx-auto bg-[#4169a4]">
        <div className="container py-20 mx-auto text-center bg-[#eeeeee]" style={{borderRadius: '20px 20px 0 0'}}>
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-16">
            Why AfriArtt?
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {items.map((item, i) => (
              <div
                key={i}
                className="text-black"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                <p className="text-md px-25">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FeaturedArts/>
      <section className='py-20 px-45 text-center text-white bg-[#4169a4]'>
        <h2 className='text-6xl font-bold'>Be part of the movement to preserve Africa’s culture for future generations.</h2>
        <div className="flex justify-center mt-10">
          <button className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold transition-all">
            Join In Now
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;