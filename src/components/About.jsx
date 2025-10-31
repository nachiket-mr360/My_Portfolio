import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import aboutData from '../data/about.json';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px", amount: 0.1 });

  // Animation variants that keep content visible
  const fadeInUp = {
    initial: { opacity: 0.3, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut" }
  };

  const fadeInLeft = {
    initial: { opacity: 0.3, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.7, ease: "easeOut" }
  };

  const fadeInRight = {
    initial: { opacity: 0.3, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.7, ease: "easeOut" }
  };

  const scaleIn = {
    initial: { opacity: 0.5, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <section id="about" className="py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.h2
            initial={fadeInUp.initial}
            animate={isInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 text-gray-900 dark:text-white">
            About <span className="text-gradient">Me</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start md:items-center">
            {/* Avatar/Photo */}
            <motion.div
              initial={scaleIn.initial}
              animate={isInView ? scaleIn.animate : scaleIn.initial}
              transition={{ ...scaleIn.transition, delay: 0.2 }}
              className="flex justify-center order-first mb-8 md:mb-0">
              <div className="relative group">
                {/* Animated glow ring */}
                <motion.div
                  className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* Border gradient */}
                <motion.div
                  className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 rounded-3xl p-1"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center overflow-hidden relative group">
                    <motion.span
                      className="text-6xl sm:text-7xl md:text-8xl z-10"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      👨‍💻
                    </motion.span>
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={fadeInRight.initial}
              animate={isInView ? fadeInRight.animate : fadeInRight.initial}
              transition={{ ...fadeInRight.transition, delay: 0.3 }}
              className="space-y-4 md:space-y-6">
              <motion.div
                initial={{ opacity: 0.3, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 10 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {aboutData.title}
                </h3>
                {aboutData.university && (
                  <p className="text-base sm:text-lg text-primary-600 dark:text-primary-400 font-medium">
                    {aboutData.degree} @ {aboutData.university}
                  </p>
                )}
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0.3, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 10 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                {aboutData.bio}
              </motion.p>

              <motion.div
                initial={{ opacity: 0.3, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -20 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="p-4 bg-primary-50 dark:bg-gray-800 rounded-xl border-l-4 border-primary-500"
              >
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 italic">
                  {aboutData.quote}
                </p>
              </motion.div>

              {/* Personal Traits */}
              {aboutData.traits && aboutData.traits.length > 0 && (
                <motion.div
                  initial={{ opacity: 0.3, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 20 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="pt-4"
                >
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    ✨ Strengths & Traits
                  </h4>
                  <div className="space-y-2">
                    {aboutData.traits.map((trait, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0.3, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -20 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                      >
                        <span className="text-primary-500">•</span>
                        <span>{trait}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0.3, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 20 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="space-y-2 pt-4"
              >
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">📧 Email:</span> {aboutData.email}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">📱 Phone:</span> {aboutData.phone}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">📍 Location:</span> {aboutData.location}
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Timeline */}
          <motion.div
            initial={fadeInUp.initial}
            animate={isInView ? fadeInUp.animate : fadeInUp.initial}
            transition={{ ...fadeInUp.transition, delay: 1.3 }}
            className="mt-20"
          >
            <h3 className="text-3xl font-bold text-center mb-12">
              My <span className="text-gradient">Journey</span>
            </h3>

            <div className="space-y-8">
              {aboutData.timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.3, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ duration: 0.7, delay: 1.5 + index * 0.2, ease: "easeOut" }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative"
                >
                  <div className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Year Badge */}
                    <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">{item.year}</span>
                    </div>

                    {/* Content */}
                    <div className={`flex-1 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {index < aboutData.timeline.length - 1 && (
                    <div className="absolute left-12 top-24 w-0.5 h-8 bg-gradient-to-b from-primary-500 to-purple-500" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Career Goals */}
          {aboutData.careerGoals && aboutData.careerGoals.length > 0 && (
            <motion.div
              initial={fadeInUp.initial}
              animate={isInView ? fadeInUp.animate : fadeInUp.initial}
              transition={{ ...fadeInUp.transition, delay: 2.3 }}
              className="mt-20"
            >
              <h3 className="text-3xl font-bold text-center mb-12">
                Career <span className="text-gradient">Goals</span> 🎯
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                {aboutData.careerGoals.map((goal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0.3, y: 40, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.3, y: 40, scale: 0.95 }}
                    transition={{ delay: 2.5 + index * 0.2, duration: 0.6, ease: "easeOut" }}
                    whileHover={{ y: -8, scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                    className={`p-6 rounded-xl shadow-lg border-2 ${
                      index === 0
                        ? 'bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border-primary-500'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{index === 0 ? '🎯' : index === 1 ? '🚀' : '🤖'}</span>
                      <div>
                        {index === 0 && (
                          <span className="inline-block px-2 py-1 bg-primary-600 text-white text-xs font-bold rounded-full mb-2">
                            PRIMARY GOAL
                          </span>
                        )}
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {goal}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
