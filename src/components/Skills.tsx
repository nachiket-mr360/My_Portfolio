import { useInView, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import skillsData from '../data/skills.json';

type Skill = {
  name: string;
  icon?: string;
  level: number;
};

// categories are stored in JSON as a mapping: { [categoryName]: Skill[] }
type SkillsJson = { categories: Record<string, Skill[]> };

const Skills = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px', amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState('Frontend');

  // skillsData.categories is expected to be an object mapping category name -> skills[]
  const data = skillsData as unknown as SkillsJson;
  const categories = Object.keys(data.categories || {});
  const skills: Skill[] = data.categories?.[activeCategory] || [];

  return (
    <section id="skills" className="py-12 md:py-20 bg-gray-50 dark:bg-gray-800" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 md:mb-6">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 md:mb-12 text-base sm:text-lg px-4">
            Technologies and tools I work with
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 md:mb-12 px-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all ${
                  activeCategory === category
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Skills Grid */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {skills.map((skill: Skill, index: number) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, rotateY: 5 }}
                className="group"
              >
                <div className="relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Hover gradient effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  {/* Icon and Name */}
                  <div className="relative z-10 flex items-center gap-4 mb-4">
                    <motion.span
                      className="text-4xl"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {skill.icon}
                    </motion.span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {skill.name}
                    </h3>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative z-10 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Proficiency
                      </span>
                      <motion.span
                        className="text-sm font-semibold text-indigo-600 dark:text-indigo-400"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full relative overflow-hidden"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5, ease: 'easeOut' }}
                      >
                        {/* Shimmer effect on progress bar */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
