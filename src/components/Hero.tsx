import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, ArrowDown } from 'lucide-react';
import { useState } from 'react';
import aboutData from '../data/about.json';
// local developer photo in src/data (imported so Vite bundles it)
import localPhoto from '../data/photo.jpg';

function HeroImage() {
  const [visible, setVisible] = useState(true);
  // prefer bundled localPhoto first (so src/data/photo.jpg is used), then about.avatar (site root), then about.image (remote), then public /avatar.jpg
  const aboutRec = aboutData as unknown as Record<string, unknown>;
  const src = (localPhoto as string) || (aboutRec['avatar'] as string | undefined) || (aboutRec['image'] as string | undefined) || '/avatar.jpg';
  const initials = (aboutData.name || '').split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase();

  return visible ? (
    <img
      src={typeof src === 'string' && src.startsWith('/') ? window.location.origin + src : String(src)}
      alt={aboutData.name}
      className="w-full h-full object-cover"
      loading="lazy"
      onError={() => {
        console.warn('Hero: image failed to load', src);
        setVisible(false);
      }}
      onLoad={() => console.log('Hero: image loaded', src)}
      crossOrigin="anonymous"
    />
  ) : (
    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-4xl font-bold text-gray-700 dark:text-gray-200">
      {initials}
    </div>
  );
}

function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {aboutData.name}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
            >
              {aboutData.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-gray-700 dark:text-gray-400 mb-8 max-w-xl"
            >
              {aboutData.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex gap-4 justify-center md:justify-start"
            >
              <a
                href={aboutData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
              >
                <Github className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </a>
              <a
                href={aboutData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
              >
                <Linkedin className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </a>
              <a
                href={aboutData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
              >
                <Instagram className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-80 h-90 md:w-80 md:h-80 lg:w-100 lg:h-96 rounded-full overflow-hidden border-8 border-white dark:border-gray-700 shadow-2xl"
              >
                <HeroImage />
              </motion.div>
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20 blur-xl"
              />
              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full opacity-20 blur-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ArrowDown className="w-8 h-8 text-gray-600 dark:text-gray-400" />
      </motion.button>
    </section>
  );
}

export default Hero;
